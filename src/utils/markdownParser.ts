import { use, parse } from "marked";
import fm from "front-matter";

/* Config Default markdown here */
// use({
//   renderer: {
//     heading(...args) {
//       console.log(args);
//       return "h1";
//     },
//   },
// });

export default function markdownParser(md: string) {
  const { attributes, body } = fm(md);
  const html = parse(body);
  return { attributes, html };
}
