import{r as n,A as y,u as N,n as I,v as L,a as r,x as R,U as q,o as E,j as e,T as l,s as u,B as W,G as w,az as O,aA as j}from"./index.7851839c.js";import{P as z}from"./forms.1982493b.js";import{T as G}from"./TwoFactorCode.d851f116.js";import{c as o,D as V}from"./Settings.module.1a0f398d.js";import{d as k}from"./index.19d276d8.js";function K(){var h;const[x,g]=n.exports.useState(!1),[C,F]=n.exports.useState("input"),P=n.exports.useRef(null),{dispatch:p}=n.exports.useContext(y),{clearErrors:b,control:i,getValues:S,handleSubmit:T,setValue:c,watch:A}=N(),{data:t}=I(),[m,{loading:_}]=L(j,{onCompleted({changePassword:s}){!p||(p({type:"update-data",payload:{accessToken:s,profile:{settings:{lastPasswordChanged:new Date().getTime()}}}}),g(!1),O.success("\xA1Has cambiado tu contrase\xF1a correctamente!"),b(),c("currentPassword",""),c("newPassword",""),c("confirmNewPassword",""))}});function v(s){var f;if(!((f=t==null?void 0:t.settings)!=null&&f.twoFactorEnabled))return m({variables:s});g(!0)}const d=(h=t==null?void 0:t.settings)!=null&&h.lastPasswordChanged?k(new Date(t.settings.lastPasswordChanged),new Date):16,a=d>=16,D=A("newPassword");return r(R,{children:[r(q,{className:E(o.settings__content,o["settings__content--changePassword"]),children:[e(l,{withLetterSpacing:!0,className:o.settings__subtitle,variant:"subtitle",children:"Cambiar contrase\xF1a"}),!a&&r(l,{withLetterSpacing:!0,className:o.settings__information,fontSize:13,children:["Debes esperar ",16-d," d\xEDa",16-d===1?"":"s"," para volver a cambiar tu contrase\xF1a."]}),e(u,{fullWidth:!0,required:!0,control:i,disabled:!a,label:"Contrase\xF1a actual",name:"currentPassword",type:"password"}),e(u,{fullWidth:!0,required:!0,control:i,disabled:!a,label:"Nueva contrase\xF1a",name:"newPassword",type:"password",validations:a&&z}),e(u,{fullWidth:!0,required:!0,control:i,disabled:!a,label:"Confirma la nueva contrase\xF1a",name:"confirmNewPassword",type:"password",validations:a&&{validate(s){return D===s||"Las contrase\xF1as no coinciden"}}}),e(W,{disabled:!a,loading:_,onClick:T(v),children:"Cambiar"})]}),x&&e(V,{onClose:()=>{},title:"Autenticaci\xF3n en dos factores",children:r(w,{container:!0,alignItems:"center",direction:"column",spacing:12,children:[e(w,{item:!0,children:e(l,{withLetterSpacing:!0,component:"p",fontSize:12,style:{marginTop:20},children:"Ingresa el c\xF3digo de 6 digitos generado en la aplicaci\xF3n"})}),e(w,{item:!0,children:e(G,{inputRef:P,onSubmit:s=>m({variables:{...S(),code:s}}),setState:F,state:C})})]})})]})}export{K as default};
