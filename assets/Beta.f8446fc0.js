import{r as u,f as v,_ as h,j as e,g,n as t,a as i,G as l,T,M as x,F as w,H as k}from"./index.79a90888.js";import{F as p}from"./Footer.870b00d5.js";const y=(c,r)=>{const a=c[r];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((d,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+r)))})};function N({id:c}){const[r,a]=u.exports.useState(null),[d,o]=u.exports.useState([]),{isLogged:s}=v();if(u.exports.useEffect(()=>{(async()=>{try{const n=await y(Object.assign({"../../../core/i18n/es/md/BetaInformation.md":()=>h(()=>import("./BetaInformation.9c01c515.js"),["assets/BetaInformation.9c01c515.js","assets/index.79a90888.js","assets/index.80b11369.css"])}),`../../../core/i18n/es/md/${c}.md`),m=n.default;a(e(m,{})),o(n.toc)}catch(n){console.error(n),a(null),o([])}})()},[]),!r)return null;function _(n,m){return i("li",{className:t.informationTemplate__nav__ul__li,children:[e("a",{className:t.informationTemplate__nav__ul__li__a,dangerouslySetInnerHTML:{__html:n.content},href:`#${n.id}`}),n.children.length>0&&e("ul",{className:t.informationTemplate__nav__ul,"data-level":n.level+1,children:n.children.map(_)})]},`nav_item_${m}_${n.id}`)}const f=e("div",{className:g(t.informationTemplate,{[t["informationTemplate--logged"]]:s}),children:i(l,{container:!0,direction:s?"row-reverse":void 0,spacing:s?48:60,children:[e(l,{item:!0,xs:3,children:i("nav",{className:t.informationTemplate__nav,children:[e(T,{withLetterSpacing:!0,className:t.informationTemplate__nav__title,variant:"title",children:"Navegaci\xF3n"}),e("ul",{className:t.informationTemplate__nav__ul,"data-level":"1",children:d.map(_)})]})}),e(l,{item:!0,xs:9,children:e("div",{className:t.informationTemplate__markdown,children:r})})]})});return s?i(x,{noPadding:!0,children:[e(l,{item:!0,xs:12,children:f}),e(p,{})]}):i(w,{children:[e(k,{auth:{navButtons:[{color:"white",link:!0,message:"Inicia sesi\xF3n",to:"/login",variant:"text"},{color:"white",link:!0,message:"Reg\xEDstrate",to:"/signup",variant:"outlined"}]}}),f,e(p,{actionButton:{color:"white",link:!0,message:"Reg\xEDstrate",to:"/signup",variant:"outlined"}})]})}function F(){return e(N,{id:"BetaInformation"})}export{F as default};
