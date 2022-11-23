import{j as e,d as T,u as _,o as v,n as E,K as H,a as i,c as Y,e as K,$ as Z,a8 as J,r as m,A as X,p as ee,q as x,F as N,B as f,a0 as ae,a9 as te,aa as ne,ab as se,ac as oe,ad as re,Y as ie}from"./index.b8cddd1d.js";import{U as ce}from"./forms.1982493b.js";import{E as le}from"./Edit.f1d65ee8.js";import{T as de}from"./TwoFactorCode.9e391c10.js";import{D as A}from"./Dialog.38a3226e.js";import{d as ue}from"./index.4649c596.js";function me({color:t=T.color,size:n=T.size,...r}){return e("svg",{...r,height:n,viewBox:"0 0 48 48",width:n,xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z",fill:t})})}function ge({loading:t=!1,onClose:n,onSave:r,submitText:o="Continuar"}){const{control:l,handleSubmit:c}=_();function d(u){r(u.password)}return e(A,{actions:[{loading:t,onClick:c(d),message:o,size:"small"}],onClose:n,title:"Confirma tu contrase\xF1a",children:e(v,{required:!0,fullWidth:!0,control:l,defaultValue:"",placeholder:"Contrase\xF1a",name:"password",type:"password"})})}const fe=[{title:"General",to:Z},{title:"Cambiar contrase\xF1a",to:J}];function he(){const{data:t}=E(),n=H();return i("nav",{className:"content",children:[e("h4",{className:"border-b-1 border-white/50 pb-[20px] mb-2 text-title text-center tracking-wide",children:"Navegaci\xF3n"}),e("ul",{className:"flex flex-col gap-[8px]",children:fe.map((r,o)=>{var d;const l=r.to.replace(":username",(d=t==null?void 0:t.username)!=null?d:""),c=n.pathname===l;return e("li",{className:Y("tracking-wide hover:pl-[4px]",{"font-bold":c}),children:i(K,{className:"block hover:no-underline",to:l,children:[c&&">"," ",r.title]})},`settings_nav_path_${o}`)})})]})}function pe(){var b,F;const[t,n]=m.exports.useState(null),[r,o]=m.exports.useState(!1),[l,c]=m.exports.useState(""),[d,u]=m.exports.useState("input"),g=m.exports.useRef(null),{clearErrors:S,control:I,getValues:R,handleSubmit:O,setError:k,setValue:U}=_(),{dispatch:h}=m.exports.useContext(X),D=ee(),{data:s,logInTwoFactor:P}=E({onLogInTwoFactorCompleted(){u("success"),c(""),n(null)},onLogInTwoFactorErrors(){u("error"),setTimeout(()=>{u("input"),g.current&&(g.current.value="",g.current.dispatchEvent(new Event("input")),g.current.focus())},500)}}),[L,{loading:y}]=x(ne,{onCompleted({changeUsername:a}){!a||!h||(o(!1),n(null),h({type:"change-access-token",payload:{accessToken:a.accessToken,profileData:a.profile}}),D(te))},onError({fields:a}){if(a.length>0){o(!1);for(const C of a)k(C.field,{message:C.message})}}}),[G,{loading:M}]=x(se,{onCompleted({generateTwoFactorQRCode:a}){c(a),o(!1),n("scan_two_factor")}}),[Q]=x(oe,{onCompleted({verifyTwoFactorCode:a}){!a||P({code:a})}}),[V,{loading:z}]=x(re,{onCompleted({disableTwoFactor:a}){!a||!h||(h({type:"update-data",payload:{profile:{settings:{twoFactorEnabled:!1}}}}),n(null))}});function W(){var a;n(null),S(),U("username",(a=s==null?void 0:s.username)!=null?a:"")}function j(){o(!1)}function q(){o(!0),n("enable_two_factor")}function B(){o(!0),n("disable_two_factor")}async function $(a){switch(t){case"change_username":{await L({variables:{password:a,username:R().username}});break}case"enable_two_factor":{await G({variables:{currentPassword:a}});break}case"disable_two_factor":{await V({variables:{currentPassword:a}});break}}}const w=(b=s==null?void 0:s.settings)!=null&&b.lastUsernameChanged?ue(new Date,new Date(s.settings.lastUsernameChanged)):60,p=w>=60;return i(N,{children:[i("div",{className:"content",children:[e("h3",{className:"mb-2 text-title tracking-wide",children:"Informaci\xF3n general"}),e(v,{fullWidth:!0,control:I,defaultValue:s==null?void 0:s.username,disabled:!p||t!=="change_username",endAdorment:p&&(t==="change_username"?i("div",{className:"flex items-center gap-[4px]",children:[e(f,{color:"success",onClick:O(()=>o(!0)),variant:"icon",children:e(me,{size:"1.25em"})}),e(f,{color:"error",onClick:W,variant:"icon",children:e(ae,{size:"1.25em"})})]}):e(f,{color:"white",onClick:()=>n("change_username"),variant:"icon",children:e(le,{size:"1.25em"})})),helperText:p?"Recuerda que no podr\xE1s cambiar tu nombre de usuario nuevamente hasta dentro de 60 d\xEDas":`No puedes cambiar tu nombre de usuario hasta dentro de ${60-w} d\xEDa${60-w===1?"":"s"}`,label:"Nombre de usuario",name:"username",validations:p&&ce}),e("div",{className:"divider mt-2 mb-[18px]"}),e("h3",{className:"mb-2 text-title tracking-wide",children:"Autenticaci\xF3n en dos factores (2AF)"}),i("div",{className:"flex flex-wrap items-center justify-center lg:justify-between gap-1",children:[e("p",{className:"basis-full lg:basis-4/6 xl:basis-3/6 text-[14px] !leading-relaxed tracking-wide",children:"La autenticaci\xF3n en dos factores (2FA) es una buena forma de a\xF1adir una capa extra de seguridad a tu cuenta de NextChat, para asegurarte que solo t\xFA puedes ingresar a tu cuenta."}),(F=s==null?void 0:s.settings)!=null&&F.twoFactorEnabled?e(f,{color:"error",onClick:B,size:"small",variant:"outlined",children:"Desactivar 2FA"}):e(f,{color:"success",onClick:q,size:"small",variant:"outlined",children:"Activar 2FA"})]})]}),t==="scan_two_factor"&&i(A,{onClose:()=>{},title:"Autenticaci\xF3n en dos factores",children:[e("h4",{className:"text-center text-[12px] tracking-wide",children:"Escanea el siguiente c\xF3digo QR con tu aplicaci\xF3n"}),e("img",{alt:"Two Factor QR Code",className:"mt-2 rounded-lg mx-auto overflow-hidden",src:l}),e("p",{className:"mt-2 text-center text-[12px] tracking-wide",children:"Ingresa el c\xF3digo de 6 digitos generado en la aplicaci\xF3n"}),e(de,{className:"mt-1 mx-auto",inputRef:g,onSubmit:a=>Q({variables:{code:a}}),setState:u,state:d})]}),r&&t&&e(ge,{loading:y||M||z,onClose:j,onSave:$,submitText:t==="change_username"?"Cambiar nombre de usuario":t==="enable_two_factor"?"Generar C\xF3digo QR":"Desactivar 2FA"})]})}function _e(){const t=ie();return i(N,{children:[e("div",{className:"basis-full lg:basis-1/3 xl:basis-1/5",children:e(he,{})}),e("div",{className:"<sm:basis-full sm:flex-1",children:t!=null?t:e(pe,{})})]})}export{_e as default};