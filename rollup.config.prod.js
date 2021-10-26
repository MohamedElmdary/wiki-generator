import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import fs from 'fs';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

/**
 * 
 * @param { {
 * 	src: string,
 * 	outdir: string,
 * 	css?: boolean,
 * 	element?: boolean,
 * 	keepCss?: boolean
 * } } options 
 */
function build(options) {
	options = {
		css: true,
		element: false,
		keepCss: false,
		...options
	};

	const configs = {
		input: options.src, // 'src/main.ts',
		output: {
			sourcemap: false,
			format: 'iife',
			name: 'app',
			file: options.outdir // 'public/build/bundle.js'
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess({ sourceMap: !production }),
				compilerOptions: {
					dev: !production,
					customElement: options.element,
				},
				onwarn(warning, handler) {
					// const { code } = warning;
					// console.log(options.keepCss, code);
					// if (options.keepCss && code === "css-unused-selector")
					// 	return;
					// handler(warning);
					const { code, frame } = warning;
					if (code === "css-unused-selector")
						return;

					handler(warning);
				}
			}),
			// css({ output: 'bundle.css' }),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			typescript({
				sourceMap: !production,
				inlineSources: !production
			}),
			!production && serve(),
			!production && livereload('public'),
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	};

	if (options.css) {
		configs.plugins.push(css({ output: 'bundle.css' }));
	}
	return configs;
}

function buildElements() {
	const dir = path.join(__dirname, 'src', 'elements');
	const outDir = `${process.env.DOCS ? 'docs' : 'public'}/build/elements/`;
	return fs
	.readdirSync(dir)
	.map(f => {
		const name = f.replace(".wc.svelte", "").toLocaleLowerCase();
		return build({
			src: `src/elements/${f}/index.ts`,
			outdir: outDir + `${name}.wc.js`,
			css: false,
			element: true,
			keepCss: true
		});
	});
}


const configs = process.env.DOCS ? [
	build({ outdir: 'docs/build/bundle.js', src: 'src/main.ts', css: true, element: false }),
] : [
	build({ outdir: 'public/build/bundle.js', src: 'src/main.ts', css: true, element: false }),
];

if (production) {
	configs.push(...buildElements());
}

export default configs;
