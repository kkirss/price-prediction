import{u as m,r as p,R as h}from"./@solidjs/router-a46c8cdf.js";import{T as y,a as g,A as v,C as E,b as P}from"./@suid/material-184e9a76.js";import{k as n,y as L}from"./solid-js-1e500652.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function c(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=c(t);fetch(t.href,e)}})();const R=()=>n(v,{position:"static",get children(){return n(y,{get children(){return n(g,{variant:"h6",children:"Price Prediction"})}})}}),w="modulepreload",O=function(i){return"/price-prediction/"+i},d={},B=function(s,c,l){if(!c||c.length===0)return s();const t=document.getElementsByTagName("link");return Promise.all(c.map(e=>{if(e=O(e),e in d)return;d[e]=!0;const r=e.endsWith(".css"),f=r?'[rel="stylesheet"]':"";if(!!l)for(let a=t.length-1;a>=0;a--){const u=t[a];if(u.href===e&&(!r||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${f}`))return;const o=document.createElement("link");if(o.rel=r?"stylesheet":w,r||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),r)return new Promise((a,u)=>{o.addEventListener("load",a),o.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>s()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},C=[{path:"/",component:L(async()=>await B(()=>import("./Home-2f22f08d.js"),["assets/Home-2f22f08d.js","assets/@solidjs/router-a46c8cdf.js","assets/solid-js-1e500652.js"]))}],_=()=>{const i=m(C);return[n(E,{}),n(R,{}),n(P,{get children(){return n(i,{})}})]},b=document.getElementById("root");p(()=>n(h,{get children(){return n(_,{})}}),b);
