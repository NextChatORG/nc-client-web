import{j as n,a0 as L,a as d,c as Z,a1 as o,r as u,k as O,v as y,W as k,o as _,a2 as j,a3 as z,a4 as B,a5 as $,J as G,K as H}from"./index.deb74e2b.js";import{p as D,M as V,C as J,c as K,A as W,f as Y,D as f}from"./MainTemplate.c6f11e3c.js";import{d as m,G as r,B as c}from"./Logo.3db86807.js";import{C as X}from"./TextField.0e4a46a5.js";function ee({color:e=m.color,size:i=m.size,...s}){return n("svg",{...s,height:i,viewBox:"0 0 48 48",width:i,xmlns:"http://www.w3.org/2000/svg",children:n("path",{d:"M9.35 39.05h1.6L32.7 17.2l-1.6-1.6L9.35 37.45Zm30.5-23.95-6.6-6.6 1.05-1.1q1.4-1.4 3.325-1.425Q39.55 5.95 40.95 7.3l.9.9q1.15 1.1 1.025 2.55-.125 1.45-1.125 2.45Zm-2.05 2.05L12.35 42.6h-6.6V36l25.4-25.4Zm-5.85-.75-.85-.8 1.6 1.6Z",fill:e})})}function ne({color:e=m.color,size:i=m.size,...s}){return n("svg",{...s,height:i,viewBox:"0 0 48 48",width:i,xmlns:"http://www.w3.org/2000/svg",children:n("path",{d:"M37.2 26.4v-6.2H31v-3.6h6.2v-6.2h3.6v6.2H47v3.6h-6.2v6.2Zm-18.95-3.1q-3.9 0-6.35-2.45-2.45-2.45-2.45-6.3 0-3.85 2.45-6.3 2.45-2.45 6.35-2.45 3.85 0 6.3 2.45Q27 10.7 27 14.55q0 3.85-2.45 6.3-2.45 2.45-6.3 2.45ZM.95 41.9v-6.05q0-2.1 1.1-3.8 1.1-1.7 3-2.6 3.85-1.7 6.925-2.4 3.075-.7 6.275-.7t6.275.7q3.075.7 6.825 2.4 1.9.9 3.025 2.575Q35.5 33.7 35.5 35.85v6.05Zm4.75-4.7h25.1v-1.15q0-.75-.425-1.45t-1.225-1.05q-3.3-1.55-5.65-2-2.35-.45-5.25-.45-2.85 0-5.275.475-2.425.475-5.675 1.975-.8.35-1.2 1.05-.4.7-.4 1.45Zm12.5-18.6q1.8 0 2.95-1.15 1.15-1.15 1.15-2.9 0-1.8-1.15-2.925Q20 10.5 18.25 10.5q-1.8 0-2.925 1.125Q14.2 12.75 14.2 14.55q0 1.75 1.125 2.9T18.2 18.6Zm.05-4.05Zm0 16.55Z",fill:e})})}function te(){return n("div",{className:L.divider})}function E({layout:e="horizontal",name:i,value:s}){return d("div",{className:Z(o.label,o[`label--${e}`]),children:[n("span",{className:o.label__name,children:i}),n("span",{className:o.label__value,children:s})]})}const re="_profile__leftContent_1f4iw_1",ie="_profile__leftContent__action_1f4iw_6",se="_profile__leftContent__username_1f4iw_13",R={profile__leftContent:re,profile__leftContent__action:ie,profile__leftContent__username:se};function oe(){var C,q,F;const[e,i]=u.exports.useState(null),{data:s}=O(),{username:a}=y(),[I,{data:h,subscribeToMore:A}]=k(z),[S,{loading:N}]=_(B,{onCompleted({sendFriendRequest:l}){!l||i({...f,canUnSendFriendRequest:!0})}}),[T,{loading:M}]=_($,{onCompleted({cancelFriendRequest:l}){!l||i({...f,canSendFriendRequest:!0})}}),[x,{loading:g}]=_(G,{onCompleted({acceptFriendRequest:l}){!l||i({...f,canSendMessage:!0})}}),[U,{loading:p}]=_(H,{onCompleted({declineFriendRequest:l}){!l||i({...f,canSendMessage:!0})}});function w(){if(!(!(t!=null&&t.id)||!(e!=null&&e.canSendFriendRequest)))return S({variables:{userId:t.id}})}function P(){if(!(!(t!=null&&t.id)||!(e!=null&&e.canUnSendFriendRequest)))return T({variables:{userId:t.id}})}function b(){if(!(!(t!=null&&t.id)||!(e!=null&&e.canAcceptFriendRequest)))return x({variables:{userId:t.id}})}function Q(){if(!(!(t!=null&&t.id)||!(e!=null&&e.canDeclineFriendRequest)))return U({variables:{userId:t.id}})}const t=a?(C=h==null?void 0:h.getProfile)!=null?C:null:s;return u.exports.useEffect(()=>{a&&a.length>=4&&a!==(s==null?void 0:s.username)&&I({variables:{username:a}})},[a]),u.exports.useEffect(()=>{t!=null&&t.actions&&i(D(t.actions))},[t]),u.exports.useEffect(()=>{a&&A({document:j,variables:{username:a},updateQuery(l,{subscriptionData:v}){return v.data?{getProfile:{...l.getProfile,actions:v.data.profileActionsChanged.actions}}:l}})},[]),n(V,{withHeader:!0,children:t&&n(r,{item:!0,xs:3,children:d(J,{className:R.profile__leftContent,children:[n("div",{className:R.profile__leftContent__action,children:d(r,{container:!0,justifyContent:"center",spacing:12,children:[n(r,{item:!0,children:e!=null&&e.canAcceptFriendRequest?n(c,{loading:g||p,onClick:b,size:"small",children:"Aceptar solicitud"}):null}),n(r,{item:!0,children:e!=null&&e.isMe?n(c,{link:!0,startIcon:n(ee,{}),to:`/profile/${t.username}/settings`,children:"Editar perfil"}):e!=null&&e.canSendMessage?n(c,{link:!0,startIcon:n(K,{}),to:`/chat/${t.id}`,children:"Enviar mensaje"}):e!=null&&e.canSendFriendRequest?n(c,{loading:N,onClick:w,startIcon:n(ne,{}),children:"Enviar solicitud"}):e!=null&&e.canUnSendFriendRequest?n(c,{color:"error",loading:M,onClick:P,startIcon:n(X,{}),children:"Cancelar solicitud"}):e!=null&&e.canDeclineFriendRequest?n(c,{color:"error",loading:g||p,onClick:Q,size:"small",children:"Rechazar solicitud"}):null})]})}),d(r,{container:!0,justifyContent:"center",spacing:24,children:[n(r,{item:!0,xs:12,children:d(r,{container:!0,alignItems:"center",direction:"column",spacing:12,children:[n(r,{item:!0,children:n(W,{size:"big",url:t.profileImage})}),n(r,{item:!0,children:n("span",{className:R.profile__leftContent__username,children:t.username})})]})}),n(r,{item:!0,xs:12,children:n(te,{})}),n(r,{item:!0,xs:12,children:d(r,{container:!0,spacing:12,children:[t.createdAt&&n(r,{item:!0,xs:12,children:n(E,{name:"Registro",value:Y(new Date(t.createdAt),"MMMM yyyy")})}),n(r,{item:!0,xs:12,children:n(E,{name:"Amigos",value:((F=(q=t.counters)==null?void 0:q.friends)!=null?F:0).toString()})})]})})]})]})})})}export{oe as default};