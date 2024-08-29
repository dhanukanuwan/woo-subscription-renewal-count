(()=>{"use strict";var e={n:t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{a:s}),s},d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.element,s=window.wp.i18n,n=window.wp.components,a=window.wp.apiFetch;var i=e.n(a);const o=window.wp.url,d=async e=>{let t="renewcountwoo/v1/updatesubscriptioncustomfieldname",s=[],n={field_name:e?.field_name,post_ids:e?.post_ids};t=(0,o.addQueryArgs)(t,n);try{s=await i()({path:t,method:"POST",headers:{"X-WP-Nonce":renew_count_js_data?.rest_nonce}})}catch(e){return console.log("updateCustomField Errors:",e),{update_errors:!0}}return s},r=(e,t)=>{let n=Object.assign({},e);switch(t.type){case"FETCH_SETTINGS":n.fetchedSettings=t.payload.fetchedSettings.data,n.stateSettings=t.payload.stateSettings.data,n.isPending=!1,n.canSave=!1,void 0!==t.payload.fetchedSettings.renew_count_errors&&(n.notice=(0,s.__)("An error occurred.","woo-subs-ren-count"),n.hasError=!0);break;case"UPDATE_CUSTOM_FIELD_BEFORE":n.isPending=t.payload.isPending,n.newSubscriptions={},n.stateSubscriptions={},n.fetchedSettings={},n.stateSettings={},n.hasError=!1;break;case"UPDATE_CUSTOM_FIELD":n.fetchedSubscriptions=t.payload.updatedSettings.data?.subscriptions,n.stateSubscriptions=t.payload.updatedSettings.data?.subscriptions,n.fetchedSettings=t.payload.updatedSettings.data?.settings,n.stateSettings=t.payload.updatedSettings.data?.settings,n.isPending=!1,n.canSave=!1,t.payload.updatedSettings.success&&(n.subscriptionsUpdated=!1),void 0!==t.payload.updatedSettings.update_errors&&(n.notice=(0,s.__)("An error occurred.","woo-subs-ren-count"),n.hasError=!0),!1===t.payload.updatedSettings.success&&(n.notice=t.payload.updatedSettings.message,n.hasError=!0);break;case"UPDATE_SUBSCRIPTION_FIELD_BEFORE":n.isPending=t.payload.isPending,n.hasError=!1;break;case"UPDATE_SUBSCRIPTION_FIELD":n.updatedSubscriptions=t.payload.updatedData.data,n.canSave=!1;break;case"UPDATE_STATE":t.payload.fetchedSettings&&(n.fetchedSettings=t.payload.fetchedSettings),t.payload.stateSettings&&(n.stateSettings=t.payload.stateSettings),void 0!==t.payload.isPending&&(n.isPending=t.payload.isPending),void 0!==t.payload.notice&&(n.notice=t.payload.notice),void 0!==t.payload.hasError&&(n.hasError=t.payload.hasError),void 0!==t.payload.canSave&&(n.canSave=t.payload.canSave)}return n},c=window.ReactJSXRuntime,u=(0,t.createContext)(),p=e=>{const[s,n]=(0,t.useReducer)(r,{fetchedSettings:{},stateSettings:{},fetchedSubscriptions:{},stateSubscriptions:{},isPending:!1,notice:"",hasError:"",canSave:!1,subscriptionsUpdated:!1,updatedCount:0,updatedSubscriptions:[]}),a=async()=>{const e=await(async()=>{let e={};try{e=await i()({path:"renewcountwoo/v1/getsettings",method:"GET",headers:{"X-WP-Nonce":renew_count_js_data?.rest_nonce}})}catch(e){return console.log("fetchSettings Errors:",e),{renew_count_errors:!0}}return e})();n({type:"FETCH_SETTINGS",payload:{fetchedSettings:e,stateSettings:e}})},p=e=>new Promise((t=>setTimeout(t,e)));(0,t.useEffect)((()=>{a()}),[]);let l={useDispatch:e=>{n(e)},useFetchSettings:a,useUpdateState:async e=>{n({type:"UPDATE_STATE",payload:e})},useUpdateCustomField:async e=>{n({type:"UPDATE_CUSTOM_FIELD_BEFORE",payload:{isPending:!0}});const t=await(async e=>{let t="renewcountwoo/v1/updatecustomfieldname",s=[],n={field_name:e?.field_name};t=(0,o.addQueryArgs)(t,n);try{s=await i()({path:t,method:"POST",headers:{"X-WP-Nonce":renew_count_js_data?.rest_nonce}})}catch(e){return console.log("updateCustomField Errors:",e),{update_errors:!0}}return s})(e);n({type:"UPDATE_CUSTOM_FIELD",payload:{updatedSettings:t}})},useUpdateSubscriptionField:async e=>{n({type:"UPDATE_SUBSCRIPTION_FIELD_BEFORE",payload:{isPending:!0}});let t=[];if(e.post_ids.length<=50)t.push(e.post_ids);else{const s=50;for(let n=0;n<e.post_ids.length;n+=s)t.push(e.post_ids.slice(n,n+s))}for(let s=0;s<t.length;s++){const a=await d({field_name:e.field_name,post_ids:JSON.stringify(t[s])});n({type:"UPDATE_SUBSCRIPTION_FIELD",payload:{updatedData:a}}),await p(800)}n({type:"UPDATE_SUBSCRIPTION_FIELD_BEFORE",payload:{isPending:!1}})},useSettings:s.stateSettings,useSubscriptions:s.stateSubscriptions,useIsPending:s.isPending,useNotice:s.notice,useHasError:s.hasError,useCanSave:s.canSave,useSubscriptionsUpdated:s.subscriptionsUpdated,useUpdatedSubscriptions:s.updatedSubscriptions};return(0,c.jsx)(u.Provider,{value:l,children:e.children})},l=()=>{const{useSettings:e,useIsPending:a,useSubscriptions:i,useHasError:o,useNotice:d,useUpdateSubscriptionField:r,useUpdatedSubscriptions:p}=(0,t.useContext)(u);return(0,c.jsx)(c.Fragment,{children:i&&i.length>0&&(0,c.jsxs)("div",{style:{marginTop:"20px"},children:[o&&!a&&(0,c.jsx)("div",{style:{marginBottom:"20px"},children:(0,c.jsx)(n.Notice,{status:"error",children:d})}),(0,c.jsxs)(n.Card,{children:[(0,c.jsx)(n.CardHeader,{children:(0,c.jsx)(n.__experimentalHeading,{level:3,children:(0,s.__)("Subscriptions custom field updater","woo-subs-ren-count")})}),(0,c.jsx)(n.CardBody,{children:(0,c.jsx)(n.__experimentalText,{children:(0,s.sprintf)((0,s.__)("%d subscriptions found.","woo-subs-ren-count"),i.length)})}),(0,c.jsx)(n.CardFooter,{children:(0,c.jsxs)(n.Button,{variant:"primary",onClick:()=>r({field_name:e.custom_field_name,post_ids:i}),children:[(0,c.jsx)("span",{children:(0,s.__)("Update Subscriptions","woo-subs-ren-count")}),a&&(0,c.jsx)(n.Spinner,{})]})})]})]})})},_=()=>{const{useSettings:e,useIsPending:a,useUpdateCustomField:i,useHasError:o,useNotice:d}=(0,t.useContext)(u),[r,p]=(0,t.useState)("");return(0,t.useEffect)((()=>{e&&p(e.custom_field_name)}),[e]),Object.keys(e).length||!1!==a?(0,c.jsxs)("div",{children:[(0,c.jsx)("h1",{children:(0,s.__)("Subscription Renewal Count Custom Field Settings","woo-subs-ren-count")}),(0,c.jsxs)("div",{style:{maxWidth:"600px",marginTop:"20px"},children:[o&&(0,c.jsx)("div",{style:{marginBottom:"20px"},children:(0,c.jsx)(n.Notice,{status:"error",children:d})}),(0,c.jsx)(n.TextControl,{label:(0,s.__)("Custom Field Name","woo-subs-ren-count"),value:r,onChange:e=>p(e),help:(0,s.__)("All subsciptions must be updated after you change the field name.","woo-subs-ren-count")}),(0,c.jsxs)(n.Button,{variant:"primary",onClick:()=>i({field_name:r}),disabled:e&&e.custom_field_name===r,children:[(0,c.jsx)("span",{children:(0,s.__)("Update Custom Field Name","woo-subs-ren-count")}),a&&(0,c.jsx)(n.Spinner,{})]}),(0,c.jsx)(l,{})]})]}):(0,c.jsxs)("div",{children:[(0,c.jsx)("h1",{children:(0,s.__)("Subscription Renewal Count Custom Field Settings","woo-subs-ren-count")}),(0,c.jsx)(n.Spinner,{})]})},S=()=>(0,c.jsx)(p,{children:(0,c.jsx)(_,{})}),g=document.getElementById("subs_renew_count_wrapper");g&&document.addEventListener("DOMContentLoaded",(()=>{(0,t.createRoot)(g).render((0,c.jsx)(S,{}))}))})();