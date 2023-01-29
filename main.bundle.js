(()=>{"use strict";var e,t,n={509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;var n=function(){function e(e,t,n){var r=this;void 0===n&&(n=1),this.gameField=e,this.gameView=t,this.isRunning=!1,this.stepSizeMs=1,this.countGeneration=0,this.stepSizeMs=n,this.render(),this.gameView.onCellClick((function(e){var t=e.row,n=e.column;r.gameField.toggleCellState(t,n),r.render()})),this.gameView.onClearField((function(){r.countGeneration=0,r.gameField.clearField(),r.render()})),this.gameView.onFieldSizeChange((function(e){r.gameField.setSize(e.width,e.height),r.render()})),this.gameView.onSpeedChange((function(e){void 0===e&&(e=1),r.stepSizeMs=n/(+e||1),r.isRunning&&(clearInterval(r.timer),r.timer=setInterval((function(){r.gameField.nextGeneration(),r.render()}),r.stepSizeMs))})),this.gameView.onGameStateChange((function(e){r.isRunning=e,e?(r.isRunning=r.gameField.nextGeneration(),r.timer=setInterval((function(){r.isRunning=r.gameField.nextGeneration(),r.isRunning||clearInterval(r.timer),r.render()}),r.stepSizeMs)):clearInterval(r.timer),r.render()}))}return e.prototype.render=function(){var e=this.gameField.getState();this.isRunning&&(this.countGeneration++,this.gameView.updateCountGeneration("renders: "+this.countGeneration)),this.gameView.updateGameField(e),this.gameView.updateGameState({isRunning:this.isRunning,width:e[0].length,height:e.length})},e}();t.Game=n},690:function(e,t){var n=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,d=o.length;a<d;a++,i++)r[i]=o[a];return r};Object.defineProperty(t,"__esModule",{value:!0}),t.GameField=void 0;var r=function(){function e(e,t){void 0===e&&(e=0),void 0===t&&(t=1),this.prevCountLiveCell=0;for(var n=[],r=0;r<t;r++){n.push([]);for(var i=0;i<e;i++)n[r].push(0)}this.field=n,this.copyField=[[]]}return e.prototype.getState=function(){return this.field},e.prototype.clearField=function(){for(var e=0;e<this.field.length;e++)for(var t=0;t<this.field[0].length;t++)this.field[e][t]=0},e.prototype.toggleCellState=function(e,t){this.field[t][e]=this.field[t][e]?0:1},e.prototype.birthOrDeath=function(e,t){var r=this.field;this.field=r.map((function(e){return n(e)}));var i=0;r[t-1]&&r[t-1][e-1]&&i++,r[t-1]&&r[t-1][e]&&i++,r[t-1]&&r[t-1][e+1]&&i++,r[t]&&r[t][e+1]&&i++,r[t+1]&&r[t+1][e+1]&&i++,r[t+1]&&r[t+1][e]&&i++,r[t+1]&&r[t+1][e-1]&&i++,r[t]&&r[t][e-1]&&i++;var o=r[t][e];return o&&(i>3||i<2)?(this.copyField[t][e]=0,0):o||3!==i?o:(this.copyField[t][e]=1,1)},e.prototype.nextGeneration=function(){var e=0;this.copyField=this.field.map((function(e){return n(e)})),this.prevState=this.field.map((function(e){return n(e)}));for(var t=0;t<this.field[0].length;t++)for(var r=0;r<this.field.length;r++)e+=this.birthOrDeath(t,r);if(this.field=this.copyField,this.prevCountLiveCell===e){var i=!0;for(t=0;t<this.field.length&&i;t++)for(r=0;r<this.field[t].length;r++)if(this.prevState[t][r]!==this.field[t][r]){i=!1;break}if(i)return!1}return this.prevCountLiveCell=e,!!e},e.prototype.setSize=function(e,t){for(var r=n(this.field),i=[],o=0;o<t;o++){i.push([]);for(var a=0;a<e;a++)r[o]&&void 0!==r[o][a]?i[o].push(r[o][a]):i[o].push(0)}this.field=i},e}();t.GameField=r},27:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameView=void 0;var n=function(){function e(e){var t=this;this.isRunning=!1,this.cellContainer=document.createElement("div"),this.gameControlsView=document.createElement("div");var n=document.createElement("div");this.gameControlsView=document.createElement("div");var r=document.createElement("button"),i=document.createElement("button"),o=document.createElement("div");o.className="generation",o.innerHTML="0",n.className="gameField",this.gameControlsView.className="gameControls",r.classList.add("btn"),r.classList.add("run-button"),r.classList.add("run-button--stopped"),r.innerHTML="Play",i.classList.add("btn"),i.classList.add("clear-button"),i.innerHTML="Clear",r.addEventListener("click",(function(){t.gameStateChangeHandler&&t.gameStateChangeHandler(!t.isRunning)})),i.addEventListener("click",(function(){t.gameClearFieldHandler&&t.gameClearFieldHandler()}));var a=document.createElement("input");a.addEventListener("change",(function(e){t.gameSpeedChangeHandler(+e.target.value)}));var d=document.createElement("input"),l=document.createElement("input");a.setAttribute("placeholder","Speed"),a.setAttribute("type","number"),d.setAttribute("placeholder","Width"),d.setAttribute("type","number"),l.setAttribute("placeholder","Height"),l.setAttribute("type","number"),a.className="speed",d.classList.add("field-size"),d.classList.add("field-size--width"),l.classList.add("field-size"),l.classList.add("field-size--height"),[d,l].forEach((function(e){e.addEventListener("change",(function(){t.onFieldSizeChangeHandler&&t.onFieldSizeChangeHandler({width:Number(d.value),height:Number(l.value)})}))})),this.cellContainer.classList.add("cell-container"),n.append(this.cellContainer),this.gameControlsView.append(r),this.gameControlsView.append(i),this.gameControlsView.append(d),this.gameControlsView.append(l),this.gameControlsView.append(a),this.gameControlsView.append(o),e.append(this.gameControlsView),e.append(n),this.htmlElement=e}return e.prototype.updateCountGeneration=function(e){this.gameControlsView.querySelector(".generation").innerHTML=e},e.prototype.updateGameField=function(e){this.cellContainer.innerHTML="";for(var t=0;t<e.length;t++){var n=document.createElement("div");n.className="cell-row";for(var r=0;r<e[0].length;r++){var i=document.createElement("div");i.classList.add("cell"),e[t][r]?i.classList.add("cell--alive"):(i.classList.add("cell"),i.classList.add("cell--dead")),i.setAttribute("data-x",""+r),i.setAttribute("data-y",""+t),n.append(i)}this.cellContainer.append(n)}},e.prototype.updateGameState=function(e){var t=e.isRunning,n=e.width,r=e.height;this.isRunning=t;var i=this.htmlElement.querySelector(".run-button"),o=this.htmlElement.querySelector(".field-size.field-size--width"),a=this.htmlElement.querySelector("input[type='number'].field-size.field-size--height");o.value=n.toString(),a.value=r.toString(),t?(i.className="",i.classList.add("btn"),i.classList.add("run-button"),i.classList.add("run-button--runned"),i.innerHTML="Stop"):(i.className="",i.classList.add("btn"),i.classList.add("run-button"),i.classList.add("run-button--stopped"),i.innerHTML="Play")},e.prototype.onCellClick=function(e){this.htmlElement.addEventListener("click",(function(t){var n=t.target;if(n.matches(".cell")){var r=Number(n.getAttribute("data-x")),i=Number(n.getAttribute("data-y"));e({row:r,column:i})}}))},e.prototype.onSpeedChange=function(e){this.gameSpeedChangeHandler=e},e.prototype.onGameStateChange=function(e){this.gameStateChangeHandler=e},e.prototype.onClearField=function(e){this.gameClearFieldHandler=e},e.prototype.onFieldSizeChange=function(e){this.onFieldSizeChangeHandler=e},e}();t.GameView=n},820:(e,t,n)=>{var r=n(509),i=n(690),o=n(27);n(887);var a=document.getElementById("app"),d=new o.GameView(a),l=new i.GameField(5,5);new r.Game(l,d,1e3)},783:(e,t,n)=>{var r=n(618),i=Object.create(null),o="undefined"==typeof document,a=Array.prototype.forEach;function d(){}function l(e,t){if(!t){if(!e.href)return;t=e.href.split("?")[0]}if(c(t)&&!1!==e.isLoaded&&t&&t.indexOf(".css")>-1){e.visited=!0;var n=e.cloneNode();n.isLoaded=!1,n.addEventListener("load",(function(){n.isLoaded||(n.isLoaded=!0,e.parentNode.removeChild(e))})),n.addEventListener("error",(function(){n.isLoaded||(n.isLoaded=!0,e.parentNode.removeChild(e))})),n.href="".concat(t,"?").concat(Date.now()),e.nextSibling?e.parentNode.insertBefore(n,e.nextSibling):e.parentNode.appendChild(n)}}function s(){var e=document.querySelectorAll("link");a.call(e,(function(e){!0!==e.visited&&l(e)}))}function c(e){return!!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e)}e.exports=function(e,t){if(o)return console.log("no window.document found, will not HMR CSS"),d;var n,u,f=function(e){var t=i[e];if(!t){if(document.currentScript)t=document.currentScript.src;else{var n=document.getElementsByTagName("script"),o=n[n.length-1];o&&(t=o.src)}i[e]=t}return function(e){if(!t)return null;var n=t.split(/([^\\/]+)\.js$/),i=n&&n[1];return i&&e?e.split(",").map((function(e){var n=new RegExp("".concat(i,"\\.js$"),"g");return r(t.replace(n,"".concat(e.replace(/{fileName}/g,i),".css")))})):[t.replace(".js",".css")]}}(e);return n=function(){var e=f(t.filename),n=function(e){if(!e)return!1;var t=document.querySelectorAll("link"),n=!1;return a.call(t,(function(t){if(t.href){var i=function(e,t){var n;return e=r(e),t.some((function(r){e.indexOf(t)>-1&&(n=r)})),n}(t.href,e);c(i)&&!0!==t.visited&&i&&(l(t,i),n=!0)}})),n}(e);if(t.locals)return console.log("[HMR] Detected local css modules. Reload all css"),void s();n?console.log("[HMR] css reload %s",e.join(" ")):(console.log("[HMR] Reload all css"),s())},50,u=0,function(){var e=this,t=arguments,r=function(){return n.apply(e,t)};clearTimeout(u),u=setTimeout(r,50)}}},618:e=>{e.exports=function(e){if(e=e.trim(),/^data:/i.test(e))return e;var t=-1!==e.indexOf("//")?e.split("//")[0]+"//":"",n=e.replace(new RegExp(t,"i"),"").split("/"),r=n[0].toLowerCase().replace(/\.$/,"");return n[0]="",t+r+n.reduce((function(e,t){switch(t){case"..":e.pop();break;case".":break;default:e.push(t)}return e}),[]).join("/")}},887:(e,t,n)=>{n.r(t);var r=n(783)(e.id,{locals:!1});e.hot.dispose(r),e.hot.accept(void 0,r)}},r={};function i(e){if(r[e])return r[e].exports;var t=r[e]={id:e,exports:{}},o={id:e,module:t,factory:n[e],require:i};return i.i.forEach((function(e){e(o)})),t=o.module,o.factory.call(t.exports,t,t.exports,o.require),t.exports}i.m=n,i.c=r,i.i=[],i.hu=e=>e+"."+i.h()+".hot-update.js",i.miniCssF=e=>{},i.hmrF=()=>"main."+i.h()+".hot-update.json",i.h=()=>"b29e9f15720f601afa38",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="gameOfLife:",i.l=(n,r,o)=>{if(e[n])e[n].push(r);else{var a,d;if(void 0!==o)for(var l=document.getElementsByTagName("script"),s=0;s<l.length;s++){var c=l[s];if(c.getAttribute("src")==n||c.getAttribute("data-webpack")==t+o){a=c;break}}a||(d=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.setAttribute("data-webpack",t+o),a.src=n),e[n]=[r];var u=(t,r)=>{a.onerror=a.onload=null,clearTimeout(f);var i=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((e=>e(r))),t)return t(r)},f=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),d&&document.head.appendChild(a)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e,t,n,r,o={},a=i.c,d=[],l=[],s="idle";function c(e){s=e;for(var t=0;t<l.length;t++)l[t].call(null,e)}function u(e){if(0===t.length)return e();var n=t;return t=[],Promise.all(n).then((function(){return u(e)}))}function f(e){if("idle"!==s)throw new Error("check() is only allowed in idle status");return c("check"),i.hmrM().then((function(r){if(!r)return c(m()?"ready":"idle"),null;c("prepare");var o=[];return t=[],n=[],Promise.all(Object.keys(i.hmrC).reduce((function(e,t){return i.hmrC[t](r.c,r.r,r.m,e,n,o),e}),[])).then((function(){return u((function(){return e?h(e):(c("ready"),o)}))}))}))}function p(e){return"ready"!==s?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status")})):h(e)}function h(e){e=e||{},m();var t=n.map((function(t){return t(e)}));n=void 0;var i,o=t.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return c("abort"),Promise.resolve().then((function(){throw o[0]}));c("dispose"),t.forEach((function(e){e.dispose&&e.dispose()})),c("apply");var a=function(e){i||(i=e)},d=[];return t.forEach((function(e){if(e.apply){var t=e.apply(a);if(t)for(var n=0;n<t.length;n++)d.push(t[n])}})),i?(c("fail"),Promise.resolve().then((function(){throw i}))):r?h(e).then((function(e){return d.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e})):(c("idle"),Promise.resolve(d))}function m(){if(r)return n||(n=[]),Object.keys(i.hmrI).forEach((function(e){r.forEach((function(t){i.hmrI[e](t,n)}))})),r=void 0,!0}i.hmrD=o,i.i.push((function(h){var m,v,g,y=h.module,b=function(n,r){var i=a[r];if(!i)return n;var o=function(t){if(i.hot.active){if(a[t]){var o=a[t].parents;-1===o.indexOf(r)&&o.push(r)}else d=[r],e=t;-1===i.children.indexOf(t)&&i.children.push(t)}else console.warn("[HMR] unexpected require("+t+") from disposed module "+r),d=[];return n(t)},l=function(e){return{configurable:!0,enumerable:!0,get:function(){return n[e]},set:function(t){n[e]=t}}};for(var f in n)Object.prototype.hasOwnProperty.call(n,f)&&"e"!==f&&Object.defineProperty(o,f,l(f));return o.e=function(e){return function(e){switch(s){case"ready":return c("prepare"),t.push(e),u((function(){c("ready")})),e;case"prepare":return t.push(e),e;default:return e}}(n.e(e))},o}(h.require,h.id);y.hot=(m=h.id,v=y,g={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:e!==m,_requireSelf:function(){d=v.parents.slice(),e=m,i(m)},active:!0,accept:function(e,t){if(void 0===e)g._selfAccepted=!0;else if("function"==typeof e)g._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var n=0;n<e.length;n++)g._acceptedDependencies[e[n]]=t||function(){};else g._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)g._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)g._declinedDependencies[e[t]]=!0;else g._declinedDependencies[e]=!0},dispose:function(e){g._disposeHandlers.push(e)},addDisposeHandler:function(e){g._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=g._disposeHandlers.indexOf(e);t>=0&&g._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,s){case"idle":n=[],Object.keys(i.hmrI).forEach((function(e){i.hmrI[e](m,n)})),c("ready");break;case"ready":Object.keys(i.hmrI).forEach((function(e){i.hmrI[e](m,n)}));break;case"prepare":case"check":case"dispose":case"apply":(r=r||[]).push(m)}},check:f,apply:p,status:function(e){if(!e)return s;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var t=l.indexOf(e);t>=0&&l.splice(t,1)},data:o[m]},e=void 0,g),y.parents=d,y.children=[],d=[],h.require=b})),i.hmrC={},i.hmrI={}})(),(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{if("undefined"!=typeof document){var e=[],t=[],n=n=>({dispose:()=>{for(var t=0;t<e.length;t++){var n=e[t];n.parentNode&&n.parentNode.removeChild(n)}e.length=0},apply:()=>{for(var e=0;e<t.length;e++)t[e].rel="stylesheet";t.length=0}});i.hmrC.miniCss=(r,o,a,d,l,s)=>{l.push(n),r.forEach((n=>{var r=i.miniCssF(n),o=i.p+r,a=((e,t)=>{for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var i=(a=n[r]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(i===e||i===t))return a}var o=document.getElementsByTagName("style");for(r=0;r<o.length;r++){var a;if((i=(a=o[r]).getAttribute("data-href"))===e||i===t)return a}})(r,o);a&&d.push(new Promise(((r,i)=>{var d=((e,t,n,r,i)=>{var o=document.createElement("link");return o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=n=>{if(o.onerror=o.onload=null,"load"===n.type)r();else{var a=n&&("load"===n.type?"missing":n.type),d=n&&n.target&&n.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+d+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=d,o.parentNode.removeChild(o),i(l)}},o.href=t,n?n.parentNode.insertBefore(o,n.nextSibling):document.head.appendChild(o),o})(n,o,a,(()=>{d.as="style",d.rel="preload",r()}),i);e.push(a),t.push(d)})))}))}}})(),(()=>{var e,t,n,r,o={179:0},a={};function d(e){return new Promise(((t,n)=>{a[e]=t;var r=i.p+i.hu(e),o=new Error;i.l(r,(t=>{if(a[e]){a[e]=void 0;var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;o.message="Loading hot update chunk "+e+" failed.\n("+r+": "+i+")",o.name="ChunkLoadError",o.type=r,o.request=i,n(o)}}))}))}function l(a){function d(e){for(var t=[e],n={},r=t.map((function(e){return{chain:[e],id:e}}));r.length>0;){var o=r.pop(),a=o.id,d=o.chain,s=i.c[a];if(s&&(!s.hot._selfAccepted||s.hot._selfInvalidated)){if(s.hot._selfDeclined)return{type:"self-declined",chain:d,moduleId:a};if(s.hot._main)return{type:"unaccepted",chain:d,moduleId:a};for(var c=0;c<s.parents.length;c++){var u=s.parents[c],f=i.c[u];if(f){if(f.hot._declinedDependencies[a])return{type:"declined",chain:d.concat([u]),moduleId:a,parentId:u};-1===t.indexOf(u)&&(f.hot._acceptedDependencies[a]?(n[u]||(n[u]=[]),l(n[u],[a])):(delete n[u],t.push(u),r.push({chain:d.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];-1===e.indexOf(r)&&e.push(r)}}i.f&&delete i.f.jsonpHmr,e=void 0;var s={},c=[],u={},f=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in t)if(i.o(t,p)){var h,m=t[p],v=!1,g=!1,y=!1,b="";switch((h=m?d(p):{type:"disposed",moduleId:p}).chain&&(b="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":a.onDeclined&&a.onDeclined(h),a.ignoreDeclined||(v=new Error("Aborted because of self decline: "+h.moduleId+b));break;case"declined":a.onDeclined&&a.onDeclined(h),a.ignoreDeclined||(v=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+b));break;case"unaccepted":a.onUnaccepted&&a.onUnaccepted(h),a.ignoreUnaccepted||(v=new Error("Aborted because "+p+" is not accepted"+b));break;case"accepted":a.onAccepted&&a.onAccepted(h),g=!0;break;case"disposed":a.onDisposed&&a.onDisposed(h),y=!0;break;default:throw new Error("Unexception type "+h.type)}if(v)return{error:v};if(g)for(p in u[p]=m,l(c,h.outdatedModules),h.outdatedDependencies)i.o(h.outdatedDependencies,p)&&(s[p]||(s[p]=[]),l(s[p],h.outdatedDependencies[p]));y&&(l(c,[h.moduleId]),u[p]=f)}t=void 0;for(var w,C=[],E=0;E<c.length;E++){var S=c[E];i.c[S]&&i.c[S].hot._selfAccepted&&u[S]!==f&&!i.c[S].hot._selfInvalidated&&C.push({module:S,require:i.c[S].hot._requireSelf,errorHandler:i.c[S].hot._selfAccepted})}return{dispose:function(){var e;n.forEach((function(e){delete o[e]})),n=void 0;for(var t,r=c.slice();r.length>0;){var a=r.pop(),d=i.c[a];if(d){var l={},u=d.hot._disposeHandlers;for(E=0;E<u.length;E++)u[E].call(null,l);for(i.hmrD[a]=l,d.hot.active=!1,delete i.c[a],delete s[a],E=0;E<d.children.length;E++){var f=i.c[d.children[E]];f&&(e=f.parents.indexOf(a))>=0&&f.parents.splice(e,1)}}}for(var p in s)if(i.o(s,p)&&(d=i.c[p]))for(w=s[p],E=0;E<w.length;E++)t=w[E],(e=d.children.indexOf(t))>=0&&d.children.splice(e,1)},apply:function(e){for(var t in u)i.o(u,t)&&(i.m[t]=u[t]);for(var n=0;n<r.length;n++)r[n](i);for(var o in s)if(i.o(s,o)){var d=i.c[o];if(d){w=s[o];for(var l=[],f=[],p=0;p<w.length;p++){var h=w[p],m=d.hot._acceptedDependencies[h];if(m){if(-1!==l.indexOf(m))continue;l.push(m),f.push(h)}}for(var v=0;v<l.length;v++)try{l[v].call(null,w)}catch(t){a.onErrored&&a.onErrored({type:"accept-errored",moduleId:o,dependencyId:f[v],error:t}),a.ignoreErrored||e(t)}}}for(var g=0;g<C.length;g++){var y=C[g],b=y.module;try{y.require(b)}catch(t){if("function"==typeof y.errorHandler)try{y.errorHandler(t)}catch(n){a.onErrored&&a.onErrored({type:"self-accept-error-handler-errored",moduleId:b,error:n,originalError:t}),a.ignoreErrored||e(n),e(t)}else a.onErrored&&a.onErrored({type:"self-accept-errored",moduleId:b,error:t}),a.ignoreErrored||e(t)}}return c}}}self.webpackHotUpdategameOfLife=(e,n,o)=>{for(var d in n)i.o(n,d)&&(t[d]=n[d]);o&&r.push(o),a[e]&&(a[e](),a[e]=void 0)},i.hmrI.jsonp=function(e,o){t||(t={},r=[],n=[],o.push(l)),i.o(t,e)||(t[e]=i.m[e])},i.hmrC.jsonp=function(a,s,c,u,f,p){f.push(l),e={},n=s,t=c.reduce((function(e,t){return e[t]=!1,e}),{}),r=[],a.forEach((function(t){i.o(o,t)&&void 0!==o[t]&&(u.push(d(t)),e[t]=!0)})),i.f&&(i.f.jsonpHmr=function(t,n){e&&!i.o(e,t)&&i.o(o,t)&&void 0!==o[t]&&(n.push(d(t)),e[t]=!0)})},i.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(i.p+i.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})(),i(820)})();