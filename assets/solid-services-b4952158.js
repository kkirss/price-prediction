import{c as h,d as y,g as i,u as g,m as p,r as R,o as x}from"./solid-js-3f7be268.js";const n=y(),l=r=>{let e;return h(n.Provider,{get value(){return e??=w({get expose(){return r.expose}})},get children(){return r.children}})};function f(){const r=g(n);if(!r)throw new Error("Your app needs to be wrapped with <ServiceRegistry> context in order to use services.");return r}function d(r,e=i()){return p(t=>(e&&R(e,x.bind(void 0,t)),r(t)),e)}function u(r,e){let t,s=!1;const a=d(o=>{try{return r(o)}catch(c){throw s=!0,t=c,o(),c}},e);if(s)throw t;return a}class v{#t;#r;#e;constructor(e={}){this.#r=e,this.#t=i(),this.#e=new Map}has(e){const t=this.getParentRegistry();return t?.isExposing(e)?t.has(e):this.#e.has(e)}get(e){const t=this.getParentRegistry();return t?.isExposing(e)?t.get(e):this.#e.get(e)}clear(){this.#e.clear()}delete(e){this.#e.delete(e)}register(e){const t=this.getParentRegistry();if(t?.isExposing(e))return t.register(e);const s=u(()=>this.initializeService(e),this.#t);return this.#e.set(e,s),s}isExposing(e){return this.#r.expose===!0||Array.isArray(this.#r.expose)&&this.#r.expose?.includes(e)}getParentRegistry(){return this.#t?.owner?u(e=>{const t=g(n);return e(),t},this.#t.owner):void 0}initializeService(e){return e.prototype?.constructor?Reflect.construct(e,[]):e()}}function w(r){return new v(r)}function E(r){const e=f();return()=>e.get(r)||e.register(r)}export{l as S,E as u};
