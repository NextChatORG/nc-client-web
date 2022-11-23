import{r as p,ae as w,j as l,a as V,F as $,c as x}from"./index.6fd775bf.js";/*! *****************************************************************************
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
***************************************************************************** */function j(e,r,n){if(n||arguments.length===2)for(var t=0,o=r.length,i;t<o;t++)(i||!(t in r))&&(i||(i=Array.prototype.slice.call(r,0,t)),i[t]=r[t]);return e.concat(i||Array.prototype.slice.call(r))}var ee=function(e){var r,n=e.current,t=e.previous,o=e.value;if(n[0]!==n[1]||typeof n[0]!="number"||typeof n[1]!="number")return null;var i=n[0],a=n[1];return i>0&&t[0]===i&&t[1]===i+1?[i-1,a]:!((r=o[i])===null||r===void 0)&&r.length?[i,a+1]:null},E=function(e){return[+e.selectionStart,+e.selectionEnd]},P=[0,0],S=function(e,r){return e[0]===r[0]&&e[1]===r[1]},te=function(e){var r=e.inputRef,n=e.previousRef,t=e.setSelection;return p.exports.useCallback(function(o){var i=o.type,a=r.current,u=n.current;if(!(!u||!a)){var f=a.selectionDirection,v=a.value,m=E(a),y=function(d){S(d,u)&&(S(d,P)||S(d,E(a)))||(n.current=d,t(function(h){return S(h,d)?h:d}),a.setSelectionRange.apply(a,j(j([],d,!1),[f||void 0],!1)))};if(i==="selectionchange"&&document.activeElement!==a)return y([v.length,v.length]);y(ee({previous:u,current:m,direction:f,value:v})||m)}},[r,n,t])},ne=function(e){var r=e.inputRef,n=e.previousRef,t=e.handler;p.exports.useLayoutEffect(function(){var o=r.current;n.current===void 0&&o&&(n.current=E(o));var i=t;return o==null||o.addEventListener("input",i),document.addEventListener("selectionchange",i),function(){o==null||o.removeEventListener("input",i),document.removeEventListener("selectionchange",i)}},[r,t,n])},re=function(e){var r=p.exports.useState(P),n=r[0],t=r[1],o=p.exports.useRef(),i=te({inputRef:e,previousRef:o,setSelection:t});return ne({inputRef:e,previousRef:o,handler:i}),n};/*! *****************************************************************************
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
***************************************************************************** */var c=function(){return c=Object.assign||function(r){for(var n,t=1,o=arguments.length;t<o;t++){n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=n[i])}return r},c.apply(this,arguments)};function oe(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)r.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n}var W=w.createContext(6),A=function(){return p.exports.useContext(W)},k=w.createContext(null),ie=function(){return p.exports.useContext(k)},ae=function(e){return l(W.Provider,c({value:e.length},{children:l(k.Provider,c({value:e.selection},{children:e.children}),void 0)}),void 0)},ue=function(e,r){var n=r[0],t=r[1];return typeof n!="number"||typeof t!="number"?null:n===t&&n===e?"cursor":e>=n&&e<t?"selected":null},ce=function(e,r){var n=r[0],t=r[1];return e<n?-1:e>=t?1:0},le=function(e,r){var n=Array(e).fill(null);return n.map(function(t,o){return{state:ue(o,r),position:ce(o,r)}})},se=function(e){return l("div",c({},e,{"data-code-input":"root"}),void 0)},de=function(e){return l("div",c({},e,{"data-code-input":"absolute",style:c({position:"absolute",left:0,right:0,top:0,bottom:0,display:"flex",justifyContent:"space-between"},e.style)}),void 0)},fe=function(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0,e.currentTarget.scrollLeft=0},pe=function(e){return l("div",c({},e,{"data-code-input":"input-scroll-wrapper",onScroll:fe,style:c(c({},e.style),{height:"100%",overflow:"hidden"})}),void 0)},ve=w.forwardRef(function(e,r){var n,t=A();return l("input",c({},e,{width:void 0,"data-code-input":"input",minLength:t,maxLength:t,ref:r,style:c(c({},e.style),{font:"inherit",letterSpacing:"inherit",textIndent:"inherit",background:"transparent",appearance:"none",display:"block",width:(n=e.width)!==null&&n!==void 0?n:"200%",padding:"0",margin:"0",border:"0 solid transparent",outline:"none"})}),void 0)}),ge=function(e){var r=ie(),n=A(),t=r,o=le(n,t),i=o.map(function(a,u){var f=a.state,v=a.position;return e.children({index:u,state:f,position:v,selection:t})});return l($,{children:i},void 0)},he=function(e){var r=e.renderSegment,n=e.length,t=n===void 0?6:n,o=e.fontFamily,i=o===void 0?"'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', monospace":o,a=e.fontSize,u=a===void 0?"2rem":a,f=e.padding,v=f===void 0?"0.25rem":f,m=e.paddingY,y=m===void 0?v:m,d=e.paddingX,h=d===void 0?v:d,I=e.spacing,b=I===void 0?"0.5rem":I,L=e.characterWidth,D=L===void 0?"1ch":L,z=e.style,X=e.className,H=e.inputClassName,B=e.inputStyle,O=e.segmentWidth,N=O===void 0?"calc(".concat(D," + ").concat(h," * 2)"):O,T=e.inputWidth,G=T===void 0?"calc(100% + ".concat(N," + ").concat(b,")"):T,g=e.inputRef,K=oe(e,["renderSegment","length","fontFamily","fontSize","padding","paddingY","paddingX","spacing","characterWidth","style","className","inputClassName","inputStyle","segmentWidth","inputWidth","inputRef"]),Y=re(g),U=c(c({},z),{position:"relative",width:"calc(".concat(N," * ").concat(t," + ").concat(b," * ").concat(t-1,")"),fontFamily:i,fontSize:u,textIndent:h,letterSpacing:"calc(".concat(h," * 2 + ").concat(b,")"),lineHeight:"calc(".concat(u," + ").concat(y," * 2)"),zIndex:0}),q={className:H,style:B,ref:g};return l(ae,c({length:t,selection:Y},{children:V(se,c({style:U,className:X},{children:[l(de,c({"aria-hidden":!0,style:{zIndex:-1}},{children:l(ge,{children:r},void 0)}),void 0),l(pe,c({onMouseDownCapture:function(s){var C,R;if(!(s.button!==0||s.ctrlKey)&&!(s.shiftKey||s.metaKey)&&s.currentTarget instanceof HTMLElement&&g.current instanceof HTMLInputElement){s.stopPropagation(),s.preventDefault();var F=s.currentTarget.getBoundingClientRect(),Z=F.left,J=F.width,Q=s.clientX-Z,M=Math.floor(Q/J*t);document.activeElement!==g.current&&((C=g.current)===null||C===void 0||C.focus()),(R=g.current)===null||R===void 0||R.setSelectionRange(M,M+1)}},onDoubleClickCapture:function(){var s;(s=g.current)===null||s===void 0||s.setSelectionRange(0,t)}},{children:l(ve,c({width:G},K,q),void 0)}),void 0)]}),void 0)}),void 0)},me=function(e){return"calc(1ch + ".concat(e," * 2)")},ye=function(e){var r=p.exports.useState(void 0),n=r[0],t=r[1],o=p.exports.useRef(n);return o.current=n,p.exports.useEffect(function(){var i=e.current;if(!!i){var a=function(){return t(!0)},u=function(){return t(!1)};return i.addEventListener("focus",a),i.addEventListener("blur",u),o.current===void 0&&t(document.activeElement===i),function(){i.removeEventListener("focus",a),i.removeEventListener("blur",u)}}},[e,t]),n};const _="10px",xe={input:"text-white/50",loading:"animate-pulseBorder",error:"text-red-500",success:"text-green-500"};function be({className:e,inputRef:r,onSubmit:n,setState:t,state:o}){const i=me(_),a=ye(r);return l(he,{autoComplete:"one-time-code",className:x(e,{"animate-shake":o==="error"}),disabled:o==="loading",id:"two-factor-code",inputClassName:"caret-transparent selection:bg-transparent",inputMode:"numeric",inputRef:r,length:6,onChange:({currentTarget:u})=>{u.value=u.value.replace(/\D+/g,""),u.value.length===6&&(t("loading"),n(u.value))},padding:_,pattern:"[0-9]*",readOnly:o!=="input",renderSegment:({state:u,index:f})=>l("div",{className:x("flex appearance-none bg-transparent rounded-md border-2 border-current h-full",xe[o],{"!text-primary":a&&u==="cursor",[x("outline-solid-transparent","shadow-[rgb(255,_255,_255)_0px_0px_0px_0px,_currentColor_0px_0px_0px_1px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px]")]:a&&(u==="cursor"||u==="selected")||o==="error"||o==="success"}),"data-state":u,style:{width:i},children:l("div",{className:x("bg-current",{"flex-1 rounded-[2px] m-[3px] opacity-[0.15625]":a&&u==="selected"||o==="error"||o==="success","animate-blinkCaret rounded-full justify-self-center flex-[0_0_2px] mx-auto my-[8px] w-[2px]":a&&u==="cursor"})})},f),spacing:_,spellCheck:!1})}export{be as T};
