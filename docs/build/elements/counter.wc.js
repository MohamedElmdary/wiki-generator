var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function s(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode.removeChild(t)}function a(t){const n={};for(const e of t)n[e.name]=e.value;return n}let u;function l(t){u=t}const f=[],d=[],h=[],$=[],p=Promise.resolve();let m=!1;function g(t){h.push(t)}let _=!1;const b=new Set;function y(){if(!_){_=!0;do{for(let t=0;t<f.length;t+=1){const n=f[t];l(n),x(n.$$)}for(l(null),f.length=0;d.length;)d.pop()();for(let t=0;t<h.length;t+=1){const n=h[t];b.has(n)||(b.add(n),n())}h.length=0}while(f.length);for(;$.length;)$.pop()();m=!1,_=!1,b.clear()}}function x(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(g)}}const k=new Set;function E(t,n){-1===t.$$.dirty[0]&&(f.push(t),m||(m=!0,p.then(y)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function v(c,s,a,f,d,h,$,p=[-1]){const m=u;l(c);const _=c.$$={fragment:null,ctx:null,props:h,update:t,not_equal:d,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(m?m.$$.context:[])),callbacks:e(),dirty:p,skip_bound:!1,root:s.target||m.$$.root};$&&$(_.root);let b=!1;if(_.ctx=a?a(c,s.props||{},((t,n,...e)=>{const o=e.length?e[0]:n;return _.ctx&&d(_.ctx[t],_.ctx[t]=o)&&(!_.skip_bound&&_.bound[t]&&_.bound[t](o),b&&E(c,t)),n})):[],_.update(),b=!0,o(_.before_update),_.fragment=!!f&&f(_.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);_.fragment&&_.fragment.l(t),t.forEach(i)}else _.fragment&&_.fragment.c();s.intro&&((x=c.$$.fragment)&&x.i&&(k.delete(x),x.i(v))),function(t,e,c,s){const{fragment:i,on_mount:a,on_destroy:u,after_update:l}=t.$$;i&&i.m(e,c),s||g((()=>{const e=a.map(n).filter(r);u?u.push(...e):o(e),t.$$.on_mount=[]})),l.forEach(g)}(c,s.target,s.anchor,s.customElement),y()}var x,v;l(m)}let C;function w(n){let e;return{c(){var n;n="h1",e=document.createElement(n),e.textContent="init commit",this.c=t},m(t,n){s(t,e,n)},p:t,i:t,o:t,d(t){t&&i(e)}}}"function"==typeof HTMLElement&&(C=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(n).filter(r);for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,n,e){this[t]=e}disconnectedCallback(){o(this.$$.on_disconnect)}$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});class j extends C{constructor(t){super(),v(this,{target:this.shadowRoot,props:a(this.attributes),customElement:!0},null,w,c,{},null),t&&t.target&&s(t.target,this,t.anchor)}}return customElements.define("tf-counter",j),j}();
