import{a as n,g as i,j as e,H as d,G as t,h,B as p}from"./index.eeed3865.js";import{F as _}from"./Footer.ac41abbd.js";function T({fields:c,figure:r,handleSubmit:a,navButtons:s,submitMessage:l,title:m}){return n("div",{className:i.authTemplate,children:[e(d,{auth:{navButtons:s}}),e("div",{className:i.authTemplate__content,children:n(t,{container:!0,alignItems:"center",justifyContent:"space-evenly",children:[e(t,{item:!0,xs:12,sm:3,children:e("form",{onSubmit:a,children:n(t,{container:!0,direction:"column",spacing:16,children:[e(t,{item:!0,children:e("h2",{className:i.authTemplate__content__title,children:m})}),c.map((o,u)=>e(t,{item:!0,xs:12,children:e(h,{...o,fullWidth:!0})},`authTemplate_text_field_${u}`)),e(t,{item:!0,xs:12,children:e(t,{container:!0,justifyContent:"flex-end",children:e(p,{color:"success",onClick:a,type:"submit",variant:"contained",children:l})})})]})})}),e(t,{item:!0,xs:12,sm:4,children:n(t,{container:!0,alignItems:"center",direction:"column",children:[e(t,{item:!0,xs:r.xs,children:r.image}),e(t,{item:!0,children:e("span",{className:i.authTemplate__content__figureCaption,children:r.caption})})]})})]})}),e(_,{})]})}export{T as A};