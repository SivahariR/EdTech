import{registerVersion as e,_registerComponent as t,_getProvider,getApp as n}from"https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";class FirebaseError extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}}class ErrorFactory{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},o=`${this.service}/${e}`,i=this.errors[e],a=i?function replaceTemplate(e,t){return e.replace(r,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(i,n):"Error",s=`${this.serviceName}: ${a} (${o}).`;return new FirebaseError(o,s,n)}}const r=/\{\$([^}]+)}/g;function getModularInstance(e){return e&&e._delegate?e._delegate:e}class Component{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}let o,i;const a=new WeakMap,s=new WeakMap,c=new WeakMap,u=new WeakMap,d=new WeakMap;let l={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return s.get(e);if("objectStoreNames"===t)return e.objectStoreNames||c.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return wrap(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function wrapFunction(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?function getCursorAdvanceMethods(){return i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}().includes(e)?function(...t){return e.apply(unwrap(this),t),wrap(a.get(this))}:function(...t){return wrap(e.apply(unwrap(this),t))}:function(t,...n){const r=e.call(unwrap(this),t,...n);return c.set(r,t.sort?t.sort():[t]),wrap(r)}}function transformCachableValue(e){return"function"==typeof e?wrapFunction(e):(e instanceof IDBTransaction&&function cacheDonePromiseForTransaction(e){if(s.has(e))return;const t=new Promise(((t,n)=>{const unlisten=()=>{e.removeEventListener("complete",complete),e.removeEventListener("error",error),e.removeEventListener("abort",error)},complete=()=>{t(),unlisten()},error=()=>{n(e.error||new DOMException("AbortError","AbortError")),unlisten()};e.addEventListener("complete",complete),e.addEventListener("error",error),e.addEventListener("abort",error)}));s.set(e,t)}(e),t=e,function getIdbProxyableTypes(){return o||(o=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}().some((e=>t instanceof e))?new Proxy(e,l):e);var t}function wrap(e){if(e instanceof IDBRequest)return function promisifyRequest(e){const t=new Promise(((t,n)=>{const unlisten=()=>{e.removeEventListener("success",success),e.removeEventListener("error",error)},success=()=>{t(wrap(e.result)),unlisten()},error=()=>{n(e.error),unlisten()};e.addEventListener("success",success),e.addEventListener("error",error)}));return t.then((t=>{t instanceof IDBCursor&&a.set(t,e)})).catch((()=>{})),d.set(t,e),t}(e);if(u.has(e))return u.get(e);const t=transformCachableValue(e);return t!==e&&(u.set(e,t),d.set(t,e)),t}const unwrap=e=>d.get(e);function openDB(e,t,{blocked:n,upgrade:r,blocking:o,terminated:i}={}){const a=indexedDB.open(e,t),s=wrap(a);return r&&a.addEventListener("upgradeneeded",(e=>{r(wrap(a.result),e.oldVersion,e.newVersion,wrap(a.transaction),e)})),n&&a.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),s.then((e=>{i&&e.addEventListener("close",(()=>i())),o&&e.addEventListener("versionchange",(e=>o(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),s}function deleteDB(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",(e=>t(e.oldVersion,e))),wrap(n).then((()=>{}))}const p=["get","getKey","getAll","getAllKeys","count"],f=["put","add","delete","clear"],g=new Map;function getMethod(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(g.get(t))return g.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=f.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!p.includes(n))return;const method=async function(e,...t){const i=this.transaction(e,o?"readwrite":"readonly");let a=i.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),o&&i.done]))[0]};return g.set(t,method),method}!function replaceTraps(e){l=e(l)}((e=>({...e,get:(t,n,r)=>getMethod(t,n)||e.get(t,n,r),has:(t,n)=>!!getMethod(t,n)||e.has(t,n)})));const h="@firebase/installations",w=new ErrorFactory("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function isServerError(e){return e instanceof FirebaseError&&e.code.includes("request-failed")}function getInstallationsEndpoint({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function extractAuthTokenInfoFromResponse(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function getErrorFromResponse(e,t){const n=(await t.json()).error;return w.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function getHeaders$1({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function getHeadersWithAuth(e,{refreshToken:t}){const n=getHeaders$1(e);return n.append("Authorization",function getAuthorizationHeader(e){return`FIS_v2 ${e}`}(t)),n}async function retryIfServerError(e){const t=await e();return t.status>=500&&t.status<600?e():t}function sleep$1(e){return new Promise((t=>{setTimeout(t,e)}))}const m=/^[cdef][\w-]{21}$/;function generateFid(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function encode(e){return function bufferToBase64UrlSafe(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}(e).substr(0,22)}(e);return m.test(t)?t:""}catch(e){return""}}function getKey$1(e){return`${e.appName}!${e.appId}`}const y=new Map;function fidChanged(e,t){const n=getKey$1(e);callFidChangeCallbacks(n,t),function broadcastFidChange(e,t){const n=function getBroadcastChannel(){!b&&"BroadcastChannel"in self&&(b=new BroadcastChannel("[Firebase] FID Change"),b.onmessage=e=>{callFidChangeCallbacks(e.data.key,e.data.fid)});return b}();n&&n.postMessage({key:e,fid:t});!function closeBroadcastChannel(){0===y.size&&b&&(b.close(),b=null)}()}(n,t)}function callFidChangeCallbacks(e,t){const n=y.get(e);if(n)for(const e of n)e(t)}let b=null;const v="firebase-installations-store";let k=null;function getDbPromise$1(){return k||(k=openDB("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(v)}})),k}async function set(e,t){const n=getKey$1(e),r=(await getDbPromise$1()).transaction(v,"readwrite"),o=r.objectStore(v),i=await o.get(n);return await o.put(t,n),await r.done,i&&i.fid===t.fid||fidChanged(e,t.fid),t}async function remove(e){const t=getKey$1(e),n=(await getDbPromise$1()).transaction(v,"readwrite");await n.objectStore(v).delete(t),await n.done}async function update(e,t){const n=getKey$1(e),r=(await getDbPromise$1()).transaction(v,"readwrite"),o=r.objectStore(v),i=await o.get(n),a=t(i);return void 0===a?await o.delete(n):await o.put(a,n),await r.done,!a||i&&i.fid===a.fid||fidChanged(e,a.fid),a}async function getInstallationEntry(e){let t;const n=await update(e.appConfig,(n=>{const r=function updateOrCreateInstallationEntry(e){return clearTimedOutRequest(e||{fid:generateFid(),registrationStatus:0})}(n),o=function triggerRegistrationIfNecessary(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(w.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function registerInstallation(e,t){try{const n=await async function createInstallationRequest({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=getInstallationsEndpoint(e),o=getHeaders$1(e),i=t.getImmediate({optional:!0});if(i){const e=await i.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const a={fid:n,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.6.8"},s={method:"POST",headers:o,body:JSON.stringify(a)},c=await retryIfServerError((()=>fetch(r,s)));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:extractAuthTokenInfoFromResponse(e.authToken)}}throw await getErrorFromResponse("Create Installation",c)}(e,t);return set(e.appConfig,n)}catch(n){throw isServerError(n)&&409===n.customData.serverCode?await remove(e.appConfig):await set(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:waitUntilFidRegistration(e)}:{installationEntry:t}}(e,r);return t=o.registrationPromise,o.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function waitUntilFidRegistration(e){let t=await updateInstallationRequest(e.appConfig);for(;1===t.registrationStatus;)await sleep$1(100),t=await updateInstallationRequest(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await getInstallationEntry(e);return n||t}return t}function updateInstallationRequest(e){return update(e,(e=>{if(!e)throw w.create("installation-not-found");return clearTimedOutRequest(e)}))}function clearTimedOutRequest(e){return function hasInstallationRequestTimedOut(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()}(e)?{fid:e.fid,registrationStatus:0}:e}async function generateAuthTokenRequest({appConfig:e,heartbeatServiceProvider:t},n){const r=function getGenerateAuthTokenEndpoint(e,{fid:t}){return`${getInstallationsEndpoint(e)}/${t}/authTokens:generate`}(e,n),o=getHeadersWithAuth(e,n),i=t.getImmediate({optional:!0});if(i){const e=await i.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const a={installation:{sdkVersion:"w:0.6.8",appId:e.appId}},s={method:"POST",headers:o,body:JSON.stringify(a)},c=await retryIfServerError((()=>fetch(r,s)));if(c.ok){return extractAuthTokenInfoFromResponse(await c.json())}throw await getErrorFromResponse("Generate Auth Token",c)}async function refreshAuthToken(e,t=!1){let n;const r=await update(e.appConfig,(r=>{if(!isEntryRegistered(r))throw w.create("not-registered");const o=r.authToken;if(!t&&function isAuthTokenValid(e){return 2===e.requestStatus&&!function isAuthTokenExpired(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(o))return r;if(1===o.requestStatus)return n=async function waitUntilAuthTokenRequest(e,t){let n=await updateAuthTokenRequest(e.appConfig);for(;1===n.authToken.requestStatus;)await sleep$1(100),n=await updateAuthTokenRequest(e.appConfig);const r=n.authToken;return 0===r.requestStatus?refreshAuthToken(e,t):r}(e,t),r;{if(!navigator.onLine)throw w.create("app-offline");const t=function makeAuthTokenRequestInProgressEntry(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function fetchAuthTokenFromServer(e,t){try{const n=await generateAuthTokenRequest(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await set(e.appConfig,r),n}catch(n){if(!isServerError(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await set(e.appConfig,n)}else await remove(e.appConfig);throw n}}(e,t),t}}));return n?await n:r.authToken}function updateAuthTokenRequest(e){return update(e,(e=>{if(!isEntryRegistered(e))throw w.create("not-registered");return function hasAuthTokenRequestTimedOut(e){return 1===e.requestStatus&&e.requestTime+1e4<Date.now()}(e.authToken)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e}))}function isEntryRegistered(e){return void 0!==e&&2===e.registrationStatus}async function getToken(e,t=!1){const n=e;await async function completeInstallationRegistration(e){const{registrationPromise:t}=await getInstallationEntry(e);t&&await t}(n);return(await refreshAuthToken(n,t)).token}function getMissingValueError$1(e){return w.create("missing-app-config-values",{valueName:e})}const publicFactory=e=>{const t=e.getProvider("app").getImmediate(),n=function extractAppConfig$1(e){if(!e||!e.options)throw getMissingValueError$1("App Configuration");if(!e.name)throw getMissingValueError$1("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw getMissingValueError$1(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:_getProvider(t,"heartbeat"),_delete:()=>Promise.resolve()}},internalFactory=e=>{const t=e.getProvider("app").getImmediate(),n=_getProvider(t,"installations").getImmediate();return{getId:()=>async function getId(e){const t=e,{installationEntry:n,registrationPromise:r}=await getInstallationEntry(t);return r?r.catch(console.error):refreshAuthToken(t).catch(console.error),n.fid}(n),getToken:e=>getToken(n,e)}};!function registerInstallations(){t(new Component("installations",publicFactory,"PUBLIC")),t(new Component("installations-internal",internalFactory,"PRIVATE"))}(),e(h,"0.6.8"),e(h,"0.6.8","esm2017");const I="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4";var T,S;function arrayToBase64(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function base64ToArray(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;++e)r[e]=n.charCodeAt(e);return r}!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(T||(T={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(S||(S={}));const E="firebase-messaging-store";let C=null;function getDbPromise(){return C||(C=openDB("firebase-messaging-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(E)}})),C}async function dbGet(e){const t=getKey(e),n=await getDbPromise(),r=await n.transaction(E).objectStore(E).get(t);if(r)return r;{const t=await async function migrateOldDatabase(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map((e=>e.name));if(!e.includes("fcm_token_details_db"))return null}let t=null;return(await openDB("fcm_token_details_db",5,{upgrade:async(n,r,o,i)=>{var a;if(r<2)return;if(!n.objectStoreNames.contains("fcm_token_object_Store"))return;const s=i.objectStore("fcm_token_object_Store"),c=await s.index("fcmSenderId").get(e);if(await s.clear(),c)if(2===r){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(a=e.createTime)&&void 0!==a?a:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:arrayToBase64(e.vapidKey)}}}else if(3===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:arrayToBase64(e.auth),p256dh:arrayToBase64(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:arrayToBase64(e.vapidKey)}}}else if(4===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:arrayToBase64(e.auth),p256dh:arrayToBase64(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:arrayToBase64(e.vapidKey)}}}}})).close(),await deleteDB("fcm_token_details_db"),await deleteDB("fcm_vapid_details_db"),await deleteDB("undefined"),function checkTokenDetails(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await dbSet(e,t),t}}async function dbSet(e,t){const n=getKey(e),r=(await getDbPromise()).transaction(E,"readwrite");return await r.objectStore(E).put(t,n),await r.done,t}function getKey({appConfig:e}){return e.appId}const D=new ErrorFactory("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});async function requestDeleteToken(e,t){const n={method:"DELETE",headers:await getHeaders(e)};try{const r=await fetch(`${getEndpoint(e.appConfig)}/${t}`,n),o=await r.json();if(o.error){const e=o.error.message;throw D.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw D.create("token-unsubscribe-failed",{errorInfo:null==e?void 0:e.toString()})}}function getEndpoint({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function getHeaders({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function getBody({p256dh:e,auth:t,endpoint:n,vapidKey:r}){const o={web:{endpoint:n,auth:t,p256dh:e}};return r!==I&&(o.web.applicationPubKey=r),o}async function getTokenInternal(e){const t=await async function getPushSubscription(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:base64ToArray(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:arrayToBase64(t.getKey("auth")),p256dh:arrayToBase64(t.getKey("p256dh"))},r=await dbGet(e.firebaseDependencies);if(r){if(function isTokenValid(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,o=t.auth===e.auth,i=t.p256dh===e.p256dh;return n&&r&&o&&i}(r.subscriptionOptions,n))return Date.now()>=r.createTime+6048e5?async function updateToken(e,t){try{const n=await async function requestUpdateToken(e,t){const n=await getHeaders(e),r=getBody(t.subscriptionOptions),o={method:"PATCH",headers:n,body:JSON.stringify(r)};let i;try{const n=await fetch(`${getEndpoint(e.appConfig)}/${t.token}`,o);i=await n.json()}catch(e){throw D.create("token-update-failed",{errorInfo:null==e?void 0:e.toString()})}if(i.error){const e=i.error.message;throw D.create("token-update-failed",{errorInfo:e})}if(!i.token)throw D.create("token-update-no-token");return i.token}(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await dbSet(e.firebaseDependencies,r),n}catch(e){throw e}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await requestDeleteToken(e.firebaseDependencies,r.token)}catch(e){console.warn(e)}return getNewToken(e.firebaseDependencies,n)}return getNewToken(e.firebaseDependencies,n)}async function deleteTokenInternal(e){const t=await dbGet(e.firebaseDependencies);t&&(await requestDeleteToken(e.firebaseDependencies,t.token),await async function dbRemove(e){const t=getKey(e),n=(await getDbPromise()).transaction(E,"readwrite");await n.objectStore(E).delete(t),await n.done}(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();return!n||n.unsubscribe()}async function getNewToken(e,t){const n=await async function requestGetToken(e,t){const n=await getHeaders(e),r=getBody(t),o={method:"POST",headers:n,body:JSON.stringify(r)};let i;try{const t=await fetch(getEndpoint(e.appConfig),o);i=await t.json()}catch(e){throw D.create("token-subscribe-failed",{errorInfo:null==e?void 0:e.toString()})}if(i.error){const e=i.error.message;throw D.create("token-subscribe-failed",{errorInfo:e})}if(!i.token)throw D.create("token-subscribe-no-token");return i.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await dbSet(e,r),r.token}async function stageLog(e,t){const n=function createFcmEvent(e,t){var n,r;const o={};e.from&&(o.project_number=e.from);e.fcmMessageId&&(o.message_id=e.fcmMessageId);o.instance_id=t,e.notification?o.message_type=T.DISPLAY_NOTIFICATION.toString():o.message_type=T.DATA_MESSAGE.toString();o.sdk_platform=3..toString(),o.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),!e.collapse_key||(o.collapse_key=e.collapse_key);o.event=1..toString(),!(null===(n=e.fcmOptions)||void 0===n?void 0:n.analytics_label)||(o.analytics_label=null===(r=e.fcmOptions)||void 0===r?void 0:r.analytics_label);return o}(t,await e.firebaseDependencies.installations.getId());!function createAndEnqueueLogEvent(e,t,n){const r={};r.event_time_ms=Math.floor(Date.now()).toString(),r.source_extension_json_proto3=JSON.stringify(t),!n||(r.compliance_data=function buildComplianceData(e){return{privacy_context:{prequest:{origin_associated_product_id:e}}}}(n));e.logEvents.push(r)}(e,n,t.productId)}function _mergeStrings(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}async function onPush(e,t){const n=function getMessagePayloadInternal({data:e}){if(!e)return null;try{return e.json()}catch(e){return null}}(e);if(!n)return;t.deliveryMetricsExportedToBigQueryEnabled&&await stageLog(t,n);const r=await getClientList();if(function hasVisibleClients(e){return e.some((e=>"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")))}(r))return function sendMessagePayloadInternalToWindows(e,t){t.isFirebaseMessaging=!0,t.messageType=S.PUSH_RECEIVED;for(const n of e)n.postMessage(t)}(r,n);if(n.notification&&await function showNotification(e){var t;const{actions:n}=e,{maxActions:r}=Notification;n&&r&&n.length>r&&console.warn(`This browser only supports ${r} actions. The remaining actions will not be displayed.`);return self.registration.showNotification(null!==(t=e.title)&&void 0!==t?t:"",e)}(function wrapInternalPayload(e){const t=Object.assign({},e.notification);return t.data={FCM_MSG:e},t}(n)),t&&t.onBackgroundMessageHandler){const e=function externalizePayload(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function propagateNotificationPayload(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const o=t.notification.image;o&&(e.notification.image=o);const i=t.notification.icon;i&&(e.notification.icon=i)}(t,e),function propagateDataPayload(e,t){t.data&&(e.data=t.data)}(t,e),function propagateFcmOptions(e,t){var n,r,o,i,a;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const s=null!==(o=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==o?o:null===(i=t.notification)||void 0===i?void 0:i.click_action;s&&(e.fcmOptions.link=s);const c=null===(a=t.fcmOptions)||void 0===a?void 0:a.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}(t,e),t}(n);"function"==typeof t.onBackgroundMessageHandler?await t.onBackgroundMessageHandler(e):t.onBackgroundMessageHandler.next(e)}}async function onNotificationClick(e){var t,n;const r=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n.FCM_MSG;if(!r)return;if(e.action)return;e.stopImmediatePropagation(),e.notification.close();const o=function getLink(e){var t,n,r;const o=null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action;if(o)return o;return function isConsoleMessage(e){return"object"==typeof e&&!!e&&"google.c.a.c_id"in e}(e.data)?self.location.origin:null}(r);if(!o)return;const i=new URL(o,self.location.href),a=new URL(self.location.origin);if(i.host!==a.host)return;let s=await async function getWindowClient(e){const t=await getClientList();for(const n of t){const t=new URL(n.url,self.location.href);if(e.host===t.host)return n}return null}(i);return s?s=await s.focus():(s=await self.clients.openWindow(o),await function sleep(e){return new Promise((t=>{setTimeout(t,e)}))}(3e3)),s?(r.messageType=S.NOTIFICATION_CLICKED,r.isFirebaseMessaging=!0,s.postMessage(r)):void 0}function getClientList(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function getMissingValueError(e){return D.create("missing-app-config-values",{valueName:e})}_mergeStrings("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),_mergeStrings("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class MessagingService{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=function extractAppConfig(e){if(!e||!e.options)throw getMissingValueError("App Configuration Object");if(!e.name)throw getMissingValueError("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw getMissingValueError(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}const SwMessagingFactory=e=>{const t=new MessagingService(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",(e=>{e.waitUntil(onPush(e,t))})),self.addEventListener("pushsubscriptionchange",(e=>{e.waitUntil(async function onSubChange(e,t){var n,r;const{newSubscription:o}=e;if(!o)return void await deleteTokenInternal(t);const i=await dbGet(t.firebaseDependencies);await deleteTokenInternal(t),t.vapidKey=null!==(r=null===(n=null==i?void 0:i.subscriptionOptions)||void 0===n?void 0:n.vapidKey)&&void 0!==r?r:I,await getTokenInternal(t)}(e,t))})),self.addEventListener("notificationclick",(e=>{e.waitUntil(onNotificationClick(e))})),t};async function isSwSupported(){return function isIndexedDBAvailable(){try{return"object"==typeof indexedDB}catch(e){return!1}}()&&await function validateIndexedDBOpenable(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var e;t((null===(e=o.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function getMessagingInSw(e=n()){return isSwSupported().then((e=>{if(!e)throw D.create("unsupported-browser")}),(e=>{throw D.create("indexed-db-unsupported")})),_getProvider(getModularInstance(e),"messaging-sw").getImmediate()}function onBackgroundMessage(e,t){return function onBackgroundMessage$1(e,t){if(void 0!==self.document)throw D.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,()=>{e.onBackgroundMessageHandler=null}}(e=getModularInstance(e),t)}function experimentalSetDeliveryMetricsExportedToBigQueryEnabled(e,t){return function _setDeliveryMetricsExportedToBigQueryEnabled(e,t){e.deliveryMetricsExportedToBigQueryEnabled=t}(e=getModularInstance(e),t)}!function registerMessagingInSw(){t(new Component("messaging-sw",SwMessagingFactory,"PUBLIC"))}();export{experimentalSetDeliveryMetricsExportedToBigQueryEnabled,getMessagingInSw as getMessaging,isSwSupported as isSupported,onBackgroundMessage};

//# sourceMappingURL=firebase-messaging-sw.js.map
