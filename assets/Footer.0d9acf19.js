import{a as t,c as r,j as e,e as l,f as n,B as x,T as m,P as d,g as p,D as f,h as g,i as h,k as E,l as _}from"./index.6fd775bf.js";const u=[{children:[{title:"Descarga",to:"/download"},{title:"Nuestro equipo",to:"/team"},{title:"Blog",to:p},{title:"Opiniones",to:"/feedback"}],title:"General"},{children:[{title:"Documentaci\xF3n",to:f},{title:"Referencias del API",to:g},{title:"C\xF3digo abierto",to:h}],title:"Desarrolladores"},{children:[{title:"Preguntas frecuentes",to:E},{title:"Soporte t\xE9cnico",to:"/support"},{title:"Centro de Ayuda",to:_}],title:"Recursos"},{children:[{title:"Compa\xF1\xEDa",to:"/about"},{title:"Agradecimientos",to:"/agrees"}],title:"Acerca de"}];function b({actionButton:s}){return t("footer",{className:"bg-dark-700 w-full px-2",children:[t("div",{className:r("flex flex-col sm:flex-row sm:items-start sm:justify-between","gap-2 sm:gap-4 px-1 sm:px-3 py-3 sm:py-4"),children:[e("div",{className:"flex-1 flex flex-row flex-wrap gap-2 sm:gap-x-0 sm:gap-y-4",children:u.map((i,a)=>t("section",{className:"flex flex-col gap-1 basis-full sm:basis-1/2 lg:basis-1/4",children:[e("p",{className:"text-[21px] font-medium",children:i.title}),i.children.map((o,c)=>e(l,{className:"text-white/60 text-[14px]",to:o.to,children:o.title},`footer_section_${a}_url_${c}`))]},`footer_section_${a}`))}),t("section",{className:"hidden sm:flex flex-col items-center gap-2",children:[e(n,{onlyIcon:!0,size:"big"}),s&&e(x,{...s,children:s.message})]})]}),t("section",{className:r("text-[14px] border-t-[1px] border-white p-1 pb-2 lg:pb-1 sm:px-3","flex flex-col sm:flex-row items-center sm:justify-between gap-1"),children:[e("p",{className:"font-medium",children:"\xA9 NextChat 2022 ~ v0.1.0"}),t("div",{className:"flex flex-wrap items-center justify-center gap-1",children:[e(l,{to:m,children:"T\xE9rminos y Condiciones"}),e(l,{to:d,children:"Pol\xEDticas de Privacidad"})]})]})]})}export{b as F};
