import{L as i}from"./lock.7eae99b9.js";import{u as c,r as d,A as l,p as m,q as p,j as r,L as f,S as g,s as x}from"./index.b8cddd1d.js";import{A as h}from"./AuthTemplate.0dfecfe5.js";import{L as v}from"./index.es.3e753284.js";import"./Footer.f73247aa.js";function N(){const{control:e,handleSubmit:o}=c(),{dispatch:t}=d.exports.useContext(l),u=m(),[n]=p(x,{onCompleted({recoverAccount:a}){!a||!t||(t({type:"recover-account",payload:a}),u("/",{replace:!0}))}});function s(a){return n({variables:a})}return r(h,{fields:[{control:e,defaultValue:"",name:"username",placeholder:"Nombre de usuario",required:!0},{control:e,defaultValue:"",name:"code",placeholder:"C\xF3digo de recuperaci\xF3n",required:!0},{control:e,defaultValue:"",name:"password",placeholder:"Nueva contrase\xF1a",required:!0},{control:e,defaultValue:"",name:"confirmPassword",placeholder:"Confirmar nueva contrase\xF1a",required:!0}],figure:{caption:"La seguridad de tu cuenta es nuestra prioridad; por eso, te recomendamos guardar los c\xF3digos de recuperaci\xF3n en un lugar seguro y evita compartirlos con alguien.",image:r(v,{animationData:i})},handleSubmit:o(s),navButtons:[{color:"white",link:!0,message:"Inicia sesi\xF3n",to:f,variant:"text"},{color:"white",link:!0,message:"Reg\xEDstrate",to:g,variant:"outlined"}],submitMessage:"VALIDAR",title:"Recupera tu cuenta"})}export{N as default};