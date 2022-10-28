import{r as v,aw as F,j as c,a as Q,x as V,o as ee,ax as S,ay as te}from"./index.7851839c.js";/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function P(e,r,n){if(n||arguments.length===2)for(var t=0,o=r.length,i;t<o;t++)(i||!(t in r))&&(i||(i=Array.prototype.slice.call(r,0,t)),i[t]=r[t]);return e.concat(i||Array.prototype.slice.call(r))}var ne=function(e){var r,n=e.current,t=e.previous,o=e.value;if(n[0]!==n[1]||typeof n[0]!="number"||typeof n[1]!="number")return null;var i=n[0],a=n[1];return i>0&&t[0]===i&&t[1]===i+1?[i-1,a]:!((r=o[i])===null||r===void 0)&&r.length?[i,a+1]:null},E=function(e){return[+e.selectionStart,+e.selectionEnd]},W=[0,0],x=function(e,r){return e[0]===r[0]&&e[1]===r[1]},re=function(e){var r=e.inputRef,n=e.previousRef,t=e.setSelection;return v.exports.useCallback(function(o){var i=o.type,a=r.current,l=n.current;if(!(!l||!a)){var p=a.selectionDirection,f=a.value,m=E(a),y=function(d){x(d,l)&&(x(d,W)||x(d,E(a)))||(n.current=d,t(function(h){return x(h,d)?h:d}),a.setSelectionRange.apply(a,P(P([],d,!1),[p||void 0],!1)))};if(i==="selectionchange"&&document.activeElement!==a)return y([f.length,f.length]);y(ne({previous:l,current:m,direction:p,value:f})||m)}},[r,n,t])},oe=function(e){var r=e.inputRef,n=e.previousRef,t=e.handler;v.exports.useLayoutEffect(function(){var o=r.current;n.current===void 0&&o&&(n.current=E(o));var i=t;return o==null||o.addEventListener("input",i),document.addEventListener("selectionchange",i),function(){o==null||o.removeEventListener("input",i),document.removeEventListener("selectionchange",i)}},[r,t,n])},ie=function(e){var r=v.exports.useState(W),n=r[0],t=r[1],o=v.exports.useRef(),i=re({inputRef:e,previousRef:o,setSelection:t});return oe({inputRef:e,previousRef:o,handler:i}),n};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var u=function(){return u=Object.assign||function(r){for(var n,t=1,o=arguments.length;t<o;t++){n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=n[i])}return r},u.apply(this,arguments)};function ae(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)r.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n}var j=F.createContext(6),A=function(){return v.exports.useContext(j)},z=F.createContext(null),ue=function(){return v.exports.useContext(z)},ce=function(e){return c(j.Provider,u({value:e.length},{children:c(z.Provider,u({value:e.selection},{children:e.children}),void 0)}),void 0)},le=function(e,r){var n=r[0],t=r[1];return typeof n!="number"||typeof t!="number"?null:n===t&&n===e?"cursor":e>=n&&e<t?"selected":null},se=function(e,r){var n=r[0],t=r[1];return e<n?-1:e>=t?1:0},de=function(e,r){var n=Array(e).fill(null);return n.map(function(t,o){return{state:le(o,r),position:se(o,r)}})},ve=function(e){return c("div",u({},e,{"data-code-input":"root"}),void 0)},fe=function(e){return c("div",u({},e,{"data-code-input":"absolute",style:u({position:"absolute",left:0,right:0,top:0,bottom:0,display:"flex",justifyContent:"space-between"},e.style)}),void 0)},pe=function(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0,e.currentTarget.scrollLeft=0},ge=function(e){return c("div",u({},e,{"data-code-input":"input-scroll-wrapper",onScroll:pe,style:u(u({},e.style),{height:"100%",overflow:"hidden"})}),void 0)},he=F.forwardRef(function(e,r){var n,t=A();return c("input",u({},e,{width:void 0,"data-code-input":"input",minLength:t,maxLength:t,ref:r,style:u(u({},e.style),{font:"inherit",letterSpacing:"inherit",textIndent:"inherit",background:"transparent",appearance:"none",display:"block",width:(n=e.width)!==null&&n!==void 0?n:"200%",padding:"0",margin:"0",border:"0 solid transparent",outline:"none"})}),void 0)}),me=function(e){var r=ue(),n=A(),t=r,o=de(n,t),i=o.map(function(a,l){var p=a.state,f=a.position;return e.children({index:l,state:p,position:f,selection:t})});return c(V,{children:i},void 0)},ye=function(e){var r=e.renderSegment,n=e.length,t=n===void 0?6:n,o=e.fontFamily,i=o===void 0?"'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', monospace":o,a=e.fontSize,l=a===void 0?"2rem":a,p=e.padding,f=p===void 0?"0.25rem":p,m=e.paddingY,y=m===void 0?f:m,d=e.paddingX,h=d===void 0?f:d,I=e.spacing,C=I===void 0?"0.5rem":I,O=e.characterWidth,D=O===void 0?"1ch":O,k=e.style,X=e.className,H=e.inputClassName,K=e.inputStyle,_=e.segmentWidth,L=_===void 0?"calc(".concat(D," + ").concat(h," * 2)"):_,T=e.inputWidth,Y=T===void 0?"calc(100% + ".concat(L," + ").concat(C,")"):T,g=e.inputRef,B=ae(e,["renderSegment","length","fontFamily","fontSize","padding","paddingY","paddingX","spacing","characterWidth","style","className","inputClassName","inputStyle","segmentWidth","inputWidth","inputRef"]),U=ie(g),q=u(u({},k),{position:"relative",width:"calc(".concat(L," * ").concat(t," + ").concat(C," * ").concat(t-1,")"),fontFamily:i,fontSize:l,textIndent:h,letterSpacing:"calc(".concat(h," * 2 + ").concat(C,")"),lineHeight:"calc(".concat(l," + ").concat(y," * 2)"),zIndex:0}),G={className:H,style:K,ref:g};return c(ce,u({length:t,selection:U},{children:Q(ve,u({style:q,className:X},{children:[c(fe,u({"aria-hidden":!0,style:{zIndex:-1}},{children:c(me,{children:r},void 0)}),void 0),c(ge,u({onMouseDownCapture:function(s){var b,R;if(!(s.button!==0||s.ctrlKey)&&!(s.shiftKey||s.metaKey)&&s.currentTarget instanceof HTMLElement&&g.current instanceof HTMLInputElement){s.stopPropagation(),s.preventDefault();var M=s.currentTarget.getBoundingClientRect(),Z=M.left,$=M.width,J=s.clientX-Z,N=Math.floor(J/$*t);document.activeElement!==g.current&&((b=g.current)===null||b===void 0||b.focus()),(R=g.current)===null||R===void 0||R.setSelectionRange(N,N+1)}},onDoubleClickCapture:function(){var s;(s=g.current)===null||s===void 0||s.setSelectionRange(0,t)}},{children:c(he,u({width:Y},B,G),void 0)}),void 0)]}),void 0)}),void 0)},Se=function(e){return"calc(1ch + ".concat(e," * 2)")},xe=function(e){var r=v.exports.useState(void 0),n=r[0],t=r[1],o=v.exports.useRef(n);return o.current=n,v.exports.useEffect(function(){var i=e.current;if(!!i){var a=function(){return t(!0)},l=function(){return t(!1)};return i.addEventListener("focus",a),i.addEventListener("blur",l),o.current===void 0&&t(document.activeElement===i),function(){i.removeEventListener("focus",a),i.removeEventListener("blur",l)}}},[e,t]),n};const w="10px";function be({inputRef:e,onSubmit:r,setState:n,state:t}){const o=Se(w),i=xe(e);return c(ye,{autoComplete:"one-time-code",className:ee(S.twoFactor__input,S[`twoFactor__input--state${te(t)}`],{[S["twoFactor__input--focused"]]:i}),disabled:t==="loading",id:"two-factor-code",inputMode:"numeric",inputRef:e,length:6,onChange:({currentTarget:a})=>{a.value=a.value.replace(/\D+/g,""),a.value.length===6&&(n("loading"),r(a.value))},padding:w,pattern:"[0-9]*",readOnly:t!=="input",renderSegment:({state:a,index:l})=>c("div",{className:S.twoFactor__input__segment,"data-state":a,style:{width:o,height:"100%"},children:c("div",{})},l),spacing:w,spellCheck:!1})}export{be as T};