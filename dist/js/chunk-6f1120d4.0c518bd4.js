(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f1120d4"],{"206d6":function(t,r,e){"use strict";e("e50d")},2155:function(t,r,e){t.exports=e.p+"img/dv_login.d5d954d8.svg"},"2a69":function(t,r,e){t.exports=e.p+"img/loginBg.132b9b41.jpg"},3500:function(t,r){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAohJREFUaAXtW71LHEEU/925URSNoFHvQj4h+AEBBSsrE6wF/wEhRSBFmlSmChwE0oakTmdnJ/aCnZYWKogJFupGDPiRj8tFyOVNLoGd7N1t3rJztzP3BvbYeW/m7e/3fjPL7HCTKRfQjo94iTLmAeTpcrH4yGARObzw/pBdcJFlgFOeBF0grsiUn+CIHK4qG+D8+9bPthBZxTivCLdUEcKuyy0Ki8KOZUCGtGOChuiIwqGUOGYQhR0TNERHFA6lxDGDx+bTdxvovwNcvw9k2yrdS1+Ak/f/H6pnEOhVn+AZ4LII+Ft0bQPfTmvHuDUJdHTr/pM94OxQt0XU+ISnHgGzhYiwMd27a8DiY0oeEfm3zL8Dbk7o1qVnwOob3RZRS9ccHp4Gnq8DV3MRsOO700VY8ejuB+ZexWcU0TN9hBXg4QcRsOO7+XO42rPUi+f8WPeULoAiXaq0dQAeveA+07ah11WxZSnXuTFSdKBSD/5euxusJXqfDOEPG8Drh3xg7Z3A0xVgZIbfN2aP5g7pHzQyVt/GhB6vW2MIe1dqoyue1/YZ8DSG8M+yAejxQiYzh6s9+8Y4MD6ne4pn4YVC6avexnDNIGFaFc0WdPif9sOEmUtDPSC/1pghXQ/X4L163sR9zSfs7yROql7A5hOuh86ATwgbSGqqQorCqZLDABhR2EBSUxVSFE6VHAbAqL8t8T5l/m7TBsGoj4KDzaAF6BmiHY1R3Xb5HdinzYJg6eytvqWzuRxsBSS0TcsnrMOwriZz2DrJmIBFYWbCrGsuClsnGROwKMxMmHXNRWHrJGMCFoWZCbOuuShsnWRMwEphn9nH5uZ0jEed2GqVQlw9dTxNndhqlaN4vwBqWGrUFuWBWgAAAABJRU5ErkJggg=="},"3c35":function(t,r){(function(r){t.exports=r}).call(this,{})},8237:function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */(function(){"use strict";var ERROR="input is invalid type",WINDOW="object"===typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"===typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"===typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&"object"===typeof module&&module.exports,AMD=__webpack_require__("3c35"),ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!==typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}!root.JS_MD5_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"===typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t){return function(r){return new Md5(!0).update(r)[t]()}},createMethod=function(){var t=createOutputMethod("hex");NODE_JS&&(t=nodeWrap(t)),t.create=function(){return new Md5},t.update=function(r){return t.create().update(r)};for(var r=0;r<OUTPUT_TYPES.length;++r){var e=OUTPUT_TYPES[r];t[e]=createOutputMethod(e)}return t},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(t){if("string"===typeof t)return crypto.createHash("md5").update(t,"utf8").digest("hex");if(null===t||void 0===t)throw ERROR;return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash("md5").update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod};function Md5(t){if(t)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var r=new ArrayBuffer(68);this.buffer8=new Uint8Array(r),this.blocks=new Uint32Array(r)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(t){if(!this.finalized){var r,e=typeof t;if("string"!==e){if("object"!==e)throw ERROR;if(null===t)throw ERROR;if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!Array.isArray(t)&&(!ARRAY_BUFFER||!ArrayBuffer.isView(t)))throw ERROR;r=!0}var i,o,s=0,a=t.length,n=this.blocks,c=this.buffer8;while(s<a){if(this.hashed&&(this.hashed=!1,n[0]=n[16],n[16]=n[1]=n[2]=n[3]=n[4]=n[5]=n[6]=n[7]=n[8]=n[9]=n[10]=n[11]=n[12]=n[13]=n[14]=n[15]=0),r)if(ARRAY_BUFFER)for(o=this.start;s<a&&o<64;++s)c[o++]=t[s];else for(o=this.start;s<a&&o<64;++s)n[o>>2]|=t[s]<<SHIFT[3&o++];else if(ARRAY_BUFFER)for(o=this.start;s<a&&o<64;++s)i=t.charCodeAt(s),i<128?c[o++]=i:i<2048?(c[o++]=192|i>>6,c[o++]=128|63&i):i<55296||i>=57344?(c[o++]=224|i>>12,c[o++]=128|i>>6&63,c[o++]=128|63&i):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++s)),c[o++]=240|i>>18,c[o++]=128|i>>12&63,c[o++]=128|i>>6&63,c[o++]=128|63&i);else for(o=this.start;s<a&&o<64;++s)i=t.charCodeAt(s),i<128?n[o>>2]|=i<<SHIFT[3&o++]:i<2048?(n[o>>2]|=(192|i>>6)<<SHIFT[3&o++],n[o>>2]|=(128|63&i)<<SHIFT[3&o++]):i<55296||i>=57344?(n[o>>2]|=(224|i>>12)<<SHIFT[3&o++],n[o>>2]|=(128|i>>6&63)<<SHIFT[3&o++],n[o>>2]|=(128|63&i)<<SHIFT[3&o++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++s)),n[o>>2]|=(240|i>>18)<<SHIFT[3&o++],n[o>>2]|=(128|i>>12&63)<<SHIFT[3&o++],n[o>>2]|=(128|i>>6&63)<<SHIFT[3&o++],n[o>>2]|=(128|63&i)<<SHIFT[3&o++]);this.lastByteIndex=o,this.bytes+=o-this.start,o>=64?(this.start=o-64,this.hash(),this.hashed=!0):this.start=o}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,r=this.lastByteIndex;t[r>>2]|=EXTRA[3&r],r>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,t[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var t,r,e,i,o,s,a=this.blocks;this.first?(t=a[0]-680876937,t=(t<<7|t>>>25)-271733879<<0,i=(-1732584194^2004318071&t)+a[1]-117830708,i=(i<<12|i>>>20)+t<<0,e=(-271733879^i&(-271733879^t))+a[2]-1126478375,e=(e<<17|e>>>15)+i<<0,r=(t^e&(i^t))+a[3]-1316259209,r=(r<<22|r>>>10)+e<<0):(t=this.h0,r=this.h1,e=this.h2,i=this.h3,t+=(i^r&(e^i))+a[0]-680876936,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+a[1]-389564586,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+a[2]+606105819,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+a[3]-1044525330,r=(r<<22|r>>>10)+e<<0),t+=(i^r&(e^i))+a[4]-176418897,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+a[5]+1200080426,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+a[6]-1473231341,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+a[7]-45705983,r=(r<<22|r>>>10)+e<<0,t+=(i^r&(e^i))+a[8]+1770035416,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+a[9]-1958414417,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+a[10]-42063,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+a[11]-1990404162,r=(r<<22|r>>>10)+e<<0,t+=(i^r&(e^i))+a[12]+1804603682,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+a[13]-40341101,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+a[14]-1502002290,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+a[15]+1236535329,r=(r<<22|r>>>10)+e<<0,t+=(e^i&(r^e))+a[1]-165796510,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+a[6]-1069501632,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+a[11]+643717713,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+a[0]-373897302,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+a[5]-701558691,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+a[10]+38016083,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+a[15]-660478335,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+a[4]-405537848,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+a[9]+568446438,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+a[14]-1019803690,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+a[3]-187363961,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+a[8]+1163531501,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+a[13]-1444681467,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+a[2]-51403784,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+a[7]+1735328473,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+a[12]-1926607734,r=(r<<20|r>>>12)+e<<0,o=r^e,t+=(o^i)+a[5]-378558,t=(t<<4|t>>>28)+r<<0,i+=(o^t)+a[8]-2022574463,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+a[11]+1839030562,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+a[14]-35309556,r=(r<<23|r>>>9)+e<<0,o=r^e,t+=(o^i)+a[1]-1530992060,t=(t<<4|t>>>28)+r<<0,i+=(o^t)+a[4]+1272893353,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+a[7]-155497632,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+a[10]-1094730640,r=(r<<23|r>>>9)+e<<0,o=r^e,t+=(o^i)+a[13]+681279174,t=(t<<4|t>>>28)+r<<0,i+=(o^t)+a[0]-358537222,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+a[3]-722521979,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+a[6]+76029189,r=(r<<23|r>>>9)+e<<0,o=r^e,t+=(o^i)+a[9]-640364487,t=(t<<4|t>>>28)+r<<0,i+=(o^t)+a[12]-421815835,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+a[15]+530742520,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+a[2]-995338651,r=(r<<23|r>>>9)+e<<0,t+=(e^(r|~i))+a[0]-198630844,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+a[7]+1126891415,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+a[14]-1416354905,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+a[5]-57434055,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+a[12]+1700485571,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+a[3]-1894986606,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+a[10]-1051523,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+a[1]-2054922799,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+a[8]+1873313359,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+a[15]-30611744,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+a[6]-1560198380,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+a[13]+1309151649,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+a[4]-145523070,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+a[11]-1120210379,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+a[2]+718787259,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+a[9]-343485551,r=(r<<21|r>>>11)+e<<0,this.first?(this.h0=t+1732584193<<0,this.h1=r-271733879<<0,this.h2=e-1732584194<<0,this.h3=i+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+r<<0,this.h2=this.h2+e<<0,this.h3=this.h3+i<<0)},Md5.prototype.hex=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),r=new Uint32Array(t);return r[0]=this.h0,r[1]=this.h1,r[2]=this.h2,r[3]=this.h3,t},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var t,r,e,i="",o=this.array(),s=0;s<15;)t=o[s++],r=o[s++],e=o[s++],i+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[63&(t<<4|r>>>4)]+BASE64_ENCODE_CHAR[63&(r<<2|e>>>6)]+BASE64_ENCODE_CHAR[63&e];return t=o[s],i+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[t<<4&63]+"==",i};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()}).call(this,__webpack_require__("f28c"),__webpack_require__("c8ba"))},a55b:function(t,r,e){"use strict";e.r(r);var i=function(){var t=this,r=t.$createElement,i=t._self._c||r;return i("div",{staticClass:"login-page",style:t.backgroundDiv},[i("div",{staticClass:"login-page-content"},[i("div",{staticClass:"cardWarp"},[t._m(0),i("div",{staticClass:"login-card"},[i("div",{staticClass:"login-card-wrapper",class:t.isLoginT?"":"transZ"},["xiaomi"===t.CUSTOMER&&1==t.showLogo?i("div",{staticStyle:{width:"60px",height:"60px",margin:"0 auto","margin-bottom":"20px"}},[i("img",{attrs:{src:e("3500"),alt:""}})]):i("h1",{staticClass:"login-logo"},[t._v("登 录")]),i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,autocomplete:"off"}},[i("el-form-item",{attrs:{prop:"email"}},[i("el-input",{attrs:{type:"text",id:"Input_UserName","prefix-icon":"el-icon-message","auto-complete":"email",placeholder:"用户名/邮箱"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&t._k(r.keyCode,"enter",13,r.key,"Enter")?null:t.handleSubmit(r)}},model:{value:t.form.email,callback:function(r){t.$set(t.form,"email",r)},expression:"form.email"}})],1),i("el-form-item",{attrs:{prop:"password",error:t.errorMsg}},[i("el-input",{attrs:{type:"password",id:"Input_Password","prefix-icon":"el-icon-lock","auto-complete":"new-password",placeholder:"密码"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&t._k(r.keyCode,"enter",13,r.key,"Enter")?null:t.handleSubmit(r)}},model:{value:t.form.password,callback:function(r){t.$set(t.form,"password",r)},expression:"form.password"}})],1),"0"==t.isSimple?i("el-form-item",[i("el-col",{attrs:{span:12}},[i("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{prop:"captcha",error:t.captionErrorMsg}},[i("el-input",{attrs:{placeholder:"验证码"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&t._k(r.keyCode,"enter",13,r.key,"Enter")?null:t.handleSubmit(r)}},model:{value:t.form.captcha,callback:function(r){t.$set(t.form,"captcha",r)},expression:"form.captcha"}})],1)],1),i("el-col",{attrs:{span:12}},[i("el-form-item",{staticStyle:{"margin-bottom":"0"}},[i("img",{staticStyle:{cursor:"pointer"},attrs:{src:t.captcha},on:{click:t.refreshCaptcha}})])],1)],1):t._e(),i("el-form-item",[i("el-button",{staticClass:"login-button",attrs:{type:"primary",id:"Button_Login",disabled:t.submitStatus},on:{click:t.handleSubmit}},[t._v("\n                确 定\n              ")]),"xiaomi"===t.CUSTOMER&&"0"==t.isSimple?i("p",{staticStyle:{"text-align":"center","font-size":"12px"}},[i("span",{staticStyle:{cursor:"pointer"},on:{click:t.dvRegister}},[t._v("注册账号")])]):t._e()],1)],1)],1)])])])])},o=[function(){var t=this,r=t.$createElement,i=t._self._c||r;return i("div",{staticClass:"rightName login-card"},[i("h2",[i("img",{staticClass:"dv-logo",attrs:{src:e("2155"),alt:""}})])])}],s=e("8237"),a=e.n(s),n=e("f3e4"),c=e("f223"),u=e("2f62"),h=e("01ea");function f(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);r&&(i=i.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,i)}return e}function l(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?f(Object(e),!0).forEach((function(r){p(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):f(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function p(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}var _=h["a"]+"Services/AuthenticationService.svc/Captcha",d={name:"Login",data:function(){var t=function(t,r,e){var i=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;""===r?e(new Error("请输入密码")):i.test(r)?e():e(new Error("密码长度为6-20位，必须包括字母、数字"))},r=function(r,e,i){""===e?i(new Error("请输入确认密码")):e!=t?i(new Error("确认密码与密码不相符")):i()},i=function(t,r,e){var i=/^1[3456789]\d{9}$/;""===r?e(new Error("手机号码")):i.test(r)?e():e(new Error("请输入有效手机号"))},o=function(t,r,e){var i=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;""===r?e(new Error("请输入邮箱地址")):i.test(r)?e():e(new Error("请输入有效邮箱地址"))},s=function(t,r,e){""===r?e(new Error("请输入用户名")):e()};return{captcha:_,form:{email:"",password:"",captcha:""},isLoginT:!0,rules:{email:[{required:!0,message:"请输入用户名或邮箱",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{type:"string",min:6,message:"密码不能少于6位",trigger:"blur"}],captcha:[{required:!0,message:"请输入验证码",trigger:"blur"}]},errorMsg:"",captionErrorMsg:"",submitStatus:!1,backgroundDiv:{backgroundImage:"url("+e("2a69")+")"},createUserForm:{userName:"",phone:"",password:"",passwordConfirm:"",EMail:""},createUserRules:{userName:[{validator:s,trigger:"blur"}],password:[{validator:t,trigger:"blur"}],passwordConfirm:[{validatorC:r,trigger:"blur"}],phone:[{validator:i,trigger:"blur"}],EMail:[{validator:o,trigger:"blur"}]},createUserErrors:{userName:"",EMail:"",password:"",passwordConfirm:"",phone:""},CUSTOMER:Object({NODE_ENV:"production",VUE_APP_BasePath:"../",VUE_APP_DESCRIPTION:"财务顾问系统",VUE_APP_Domain:"http://172.16.6.174",VUE_APP_IsSimple:"0",VUE_APP_Platform:"win",VUE_APP_TITLE:"财务顾问系统",BASE_URL:""}).VUE_APP_CUSTOMER,showLogo:Object({NODE_ENV:"production",VUE_APP_BasePath:"../",VUE_APP_DESCRIPTION:"财务顾问系统",VUE_APP_Domain:"http://172.16.6.174",VUE_APP_IsSimple:"0",VUE_APP_Platform:"win",VUE_APP_TITLE:"财务顾问系统",BASE_URL:""}).VUE_APP_ShowLogo,isSimple:"0"}},created:function(){this.$title("登录")},computed:l(l({},Object(u["c"])(["isLogin"])),Object(u["e"])(["siteTitle"])),methods:l(l({},Object(u["b"])("user",["handleUserLogin"])),{},{dvRegister:function(){window.location.href="/Community/#/register?appPath="+encodeURIComponent("/DealViewer/#/login")},handleCreateUser:function(){this.$refs.createUserForm},handleSubmit:function(){var t=this;this.$refs.form.validate((function(r){if(r){t.submitStatus=!0,""!==t.errorMsg&&(t.errorMsg=""),""!==t.captionErrorMsg&&(t.captionErrorMsg="");var e={username:t.form.email.trim(),password:a()(t.form.password),captcha:"0"==t.isSimple?t.form.captcha:"1E6046FC-5C78-43D4-9409-3F62BB2979EC"};t.handleUserLogin(e).then((function(r){if(t.submitStatus=!1,!r)return t.captionErrorMsg="您输入的验证码不正确！",void t.refreshCaptcha();var e=t.$route.query.redirectURL;void 0!==e?t.$router.replace(e):t.$router.push("0"==t.isSimple?"/Product/ProductList":"/quotation-analysis/index"),n["a"].set(c["a"].userInfo,JSON.stringify(r),{path:"/"})}),(function(){t.errorMsg="您输入的密码和账户名不匹配！",t.captionErrorMsg="",t.refreshCaptcha(),t.submitStatus=!1}))}}))},refreshCaptcha:function(){this.captcha=_+"?"+100*Math.random()}})},A=d,E=(e("206d6"),e("2877")),b=Object(E["a"])(A,i,o,!1,null,null,null);r["default"]=b.exports},e50d:function(t,r,e){}}]);