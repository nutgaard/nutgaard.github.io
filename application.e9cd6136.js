parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"bdcI":[function(require,module,exports) {
"use strict";function e(e,n){var t=function(){n.innerHTML=e()};window.onhashchange=t,window.addEventListener("render",t),t()}function n(){window.dispatchEvent(new Event("render"))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.start=e,exports.render=n;
},{}],"Jhzt":[function(require,module,exports) {
"use strict";var n=this&&this.__spreadArrays||function(){for(var n=0,t=0,r=arguments.length;t<r;t++)n+=arguments[t].length;var e=Array(n),o=0;for(t=0;t<r;t++)for(var a=arguments[t],i=0,s=a.length;i<s;i++,o++)e[o]=a[i];return e};Object.defineProperty(exports,"__esModule",{value:!0});var t={href:"#!pages",description:"Not Found - 404",content:function(){return"Page not found"}};function r(r){var e=r.map(function(n){return'\n            <a class="'+["tabs__tabbutton",window.location.hash===n.href?"tabs__tabbutton--isactive":""].join(" ").trim()+'" href="'+n.href+'">\n                <h2>'+n.description+"</h2>\n            </a>\n        "}),o=r.find(function(n){return window.location.hash===n.href})||t;return n(e,['\n        <div class="tabs__content">\n            '+o.content()+"\n        </div>\n        "]).join("")}exports.default=r;
},{}],"KmwN":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,a){function u(e){try{s(r.next(e))}catch(t){a(t)}}function i(e){try{s(r.throw(e))}catch(t){a(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,i)}s((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,a,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,r=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){u=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){u.label=a[1];break}if(6===a[0]&&u.label<o[1]){u.label=o[1],o=a;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(a);break}o[2]&&u.ops.pop(),u.trys.pop();continue}a=t.call(e,u)}catch(i){a=[6,i],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}};function n(n){return e(this,void 0,Promise,function(){return t(this,function(e){return[2,fetch(n).then(function(e){return e.json()})]})})}Object.defineProperty(exports,"__esModule",{value:!0});var r=function(e){return"https://api.github.com/users/nutgaard/repos?per_page=100&page="+e};function o(){return e(this,void 0,Promise,function(){var e,o,a,i,s;return t(this,function(t){switch(t.label){case 0:e=1,o=[],a=!0,t.label=1;case 1:t.trys.push([1,6,,7]),t.label=2;case 2:return[4,n(r(e))];case 3:i=t.sent(),o=o.concat(i),e++,a=100===i.length,t.label=4;case 4:if(a)return[3,2];t.label=5;case 5:return[2,Promise.resolve(u(o))];case 6:return s=t.sent(),[2,Promise.reject(s)];case 7:return[2]}})})}function a(){return e(this,void 0,Promise,function(){return t(this,function(e){return[2,new Promise(function(e,t){t(new Error("Failed to fetch data..."))})]})})}function u(e){return e.sort(function(e,t){var n=e.has_pages;return n==t.has_pages?-1*e.pushed_at.localeCompare(t.pushed_at):n?-1:1})}exports.fetchRepos=o,exports.fetchReposLocal=a;
},{}],"ul02":[function(require,module,exports) {
"use strict";var n=this&&this.__importStar||function(n){if(n&&n.__esModule)return n;var r={};if(null!=n)for(var e in n)Object.hasOwnProperty.call(n,e)&&(r[e]=n[e]);return r.default=n,r};Object.defineProperty(exports,"__esModule",{value:!0});var r=n(require("./framework"));function e(n,e){var u=null,a=null;return n.then(function(n){u=n,r.render()},function(n){a=n,r.render()}).catch(function(n){a=n,r.render()}),function(){return null!==a?'\n                <div class="error">\n                    <h1>Obs</h1>\n                    <p>Failed to fetch: '+a.message+"</p>\n                </div>\n            ":null===u?t():e(u)}}function t(){return'\n        <div class="loader">\n            <span>{</span>\n            <span>}</span>\n        </div>\n    '}exports.withLoader=e,exports.default=t;
},{"./framework":"bdcI"}],"JLtz":[function(require,module,exports) {
"use strict";function t(t,e){if(0===t.length)return null;var r=t[0];return t.reduce(n(e),r)}function n(t){return function(n,e){var r=t(n),s=t(e);return"string"==typeof r&&"string"==typeof s?r.localeCompare(s)>=0?n:e:r>s?n:e}}Object.defineProperty(exports,"__esModule",{value:!0});var e={name:"Not found",has_pages:!1,watchers_count:0,fork:!1,forks_count:0,open_issues_count:0,stargazers_count:0,pushed_at:"",updated_at:""};function r(n){var r=t(n,function(t){return t.pushed_at})||e,s=t(n,function(t){return t.watchers_count})||e,u=t(n,function(t){return t.forks_count})||e,o=t(n,function(t){return t.open_issues_count})||e,a=t(n,function(t){return t.stargazers_count})||e;return'\n    <div class="grid github__statistics grid--small-1 grid--medium-2 grid--large-3">\n        <p><b>Number of repositories: </b>'+n.length+"</p>\n        <p><b>Latest update: </b>"+r.name+"</p>\n        <p><b>Most watchers: </b>"+s.name+" ("+s.watchers_count+")</p>\n        <p><b>Most forked: </b>"+u.name+" ("+u.forks_count+")</p>\n        <p><b>Most open issues: </b>"+o.name+" ("+o.open_issues_count+")</p>\n        <p><b>Most stars: </b>"+a.name+" ("+a.stargazers_count+")</p>\n    </div>\n    "}exports.default=r;
},{}],"b6sP":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./statistics"));function n(e){return'\n        <a class="github__repo github__repo--haspages" href="//www.utgaard.xyz/'+e.name+'/">\n            <h3>'+e.name+"</h3>\n            <p>"+(e.description||"")+"</p>\n        </a>\n    "}function r(e){var r=e.filter(function(e){return e.has_pages}),i=3*Math.ceil(r.length/3)-r.length,a=new Array(i).fill(0).map(function(){return'<div class="github__emptyrepo"></div>'}),s=r.map(n).concat(a).join("\n");return'\n        <div class="github">\n            '+t.default(r)+'\n            <div class="grid grid--small-1 grid--medium-2 grid--large-3">\n                '+s+"        \n            </div>\n        </div>\n    "}exports.default=r;
},{"./statistics":"JLtz"}],"xSmh":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./statistics"));function n(e){return'\n        <a class="github__repo github__repo--haspages" href="//www.github.com/nutgaard/'+e.name+'/">\n            <h3>'+e.name+"</h3>\n            <p>"+(e.description||"")+"</p>\n        </a>\n    "}function i(e){var i=3*Math.ceil(e.length/3)-e.length,r=new Array(i).fill(0).map(function(){return'<div class="github__emptyrepo"></div>'}),a=e.map(n).concat(r).join("\n");return'\n        <div class="github">\n            '+t.default(e)+'\n            <div class="grid grid--small-1 grid--medium-2 grid--large-3">\n                '+a+"        \n            </div>\n        </div>\n    "}exports.default=i;
},{"./statistics":"JLtz"}],"RwRK":[function(require,module,exports) {
"use strict";function e(){return'\n        <div class="about">\n            <h1>About</h1>\n            <pre>This is where I would put the about section...</pre>\n        </div>\n    '}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"yekg":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./framework")),a=r(require("./tabscontroller")),n=require("./data"),i=require("./loader"),o=r(require("./githubpages")),u=r(require("./githubrepos")),s=r(require("./about")),d=n.fetchRepos(),h=[{href:"#!pages",description:"Github pages",content:i.withLoader(d,o.default)},{href:"#!repos",description:"Github repos",content:i.withLoader(d,u.default)},{href:"#!about",description:"About",content:s.default}],l=h.findIndex(function(e){return e.href===window.location.hash})>=0;function c(){return'\n        <div class="application">\n            <header class="header dark">\n                <h1>Utgaard</h1>\n            </header>\n            <main class="application__main">\n                <div class="tabs">\n                    '+a.default(h)+'\n                </div>\n            </main>\n            <footer class="footer dark">\n                <h1>Utgaard</h1>\n            </footer>\n        </div>\n    '}l||(window.location.hash=h[0].href),t.start(c,document.getElementById("root"));
},{"./framework":"bdcI","./tabscontroller":"Jhzt","./data":"KmwN","./loader":"ul02","./githubpages":"b6sP","./githubrepos":"xSmh","./about":"RwRK"}]},{},["yekg"], null)
//# sourceMappingURL=/application.e9cd6136.js.map