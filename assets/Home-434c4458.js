import{C as c}from"./CenteredBox-0568f777.js";import{d as e,S as n,O as d}from"./solid-js-b9f6b6bd.js";import{w as m,x as u}from"./@suid/material-5587fef1.js";import{D as l}from"./@price-prediction/financial-assets-ui-ded2a4d6.js";import{A as p,s as g}from"./@price-prediction/coincap-api-2fb500a7.js";import{c as h}from"./@tanstack/solid-query-ac22c412.js";import"./@suid/system-7161daa8.js";import"./@suid/icons-material-b932e8a1.js";import"./openapi-fetch-6bcd5f47.js";const y=p(),f=t=>h({queryKey:()=>["assets",{id:t()}],queryFn:async({signal:r,queryKey:[a,{id:o}]})=>{const{data:i,error:s}=await y.GET(g,{signal:r,params:{path:{id:o}}});if(s!==void 0)throw new Error(s.error);return i},select:r=>({data:{...r.data,priceUsd:Number(r.data.priceUsd)}}),staleTime:60*5*1e3}),w=t=>{const r=f(()=>t.assetId);return e(d,{get fallback(){return e(m,{})},get children(){return[e(n,{get when(){return r.data},children:a=>e(l,{get sx(){return t.sx},get assetName(){return a().data.name},get price(){return a().data.priceUsd},currencySymbol:"$",onPredictPrice:()=>{}})}),e(n,{get when(){return r.error},get children(){return e(u,{severity:"error",get children(){return r.error}})}})]}})},D=()=>e(c,{get children(){return e(w,{assetId:"bitcoin",sx:{minWidth:"50%"}})}});export{D as default};
