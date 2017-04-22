define(["react","VSS/Utils/String"],function(t,r){return function(t){function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}var e={};return r.m=t,r.c=e,r.i=function(t){return t},r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},r.p="",r(r.s=53)}({0:function(r,e){r.exports=t},15:function(t,r,e){"use strict";function n(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===t[r-2]?2:"="===t[r-1]?1:0}function i(t){return 3*t.length/4-n(t)}function o(t){var r,e,i,o,u,s,f=t.length;u=n(t),s=new c(3*f/4-u),i=u>0?f-4:f;var a=0;for(r=0,e=0;r<i;r+=4,e+=3)o=h[t.charCodeAt(r)]<<18|h[t.charCodeAt(r+1)]<<12|h[t.charCodeAt(r+2)]<<6|h[t.charCodeAt(r+3)],s[a++]=o>>16&255,s[a++]=o>>8&255,s[a++]=255&o;return 2===u?(o=h[t.charCodeAt(r)]<<2|h[t.charCodeAt(r+1)]>>4,s[a++]=255&o):1===u&&(o=h[t.charCodeAt(r)]<<10|h[t.charCodeAt(r+1)]<<4|h[t.charCodeAt(r+2)]>>2,s[a++]=o>>8&255,s[a++]=255&o),s}function u(t){return a[t>>18&63]+a[t>>12&63]+a[t>>6&63]+a[63&t]}function s(t,r,e){for(var n,i=[],o=r;o<e;o+=3)n=(t[o]<<16)+(t[o+1]<<8)+t[o+2],i.push(u(n));return i.join("")}function f(t){for(var r,e=t.length,n=e%3,i="",o=[],u=0,f=e-n;u<f;u+=16383)o.push(s(t,u,u+16383>f?f:u+16383));return 1===n?(r=t[e-1],i+=a[r>>2],i+=a[r<<4&63],i+="=="):2===n&&(r=(t[e-2]<<8)+t[e-1],i+=a[r>>10],i+=a[r>>4&63],i+=a[r<<2&63],i+="="),o.push(i),o.join("")}r.byteLength=i,r.toByteArray=o,r.fromByteArray=f;for(var a=[],h=[],c="undefined"!=typeof Uint8Array?Uint8Array:Array,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0,g=l.length;p<g;++p)a[p]=l[p],h[l.charCodeAt(p)]=p;h["-".charCodeAt(0)]=62,h["_".charCodeAt(0)]=63},16:function(t,r,e){"use strict";(function(t){function n(){return o.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(t,r){if(n()<r)throw new RangeError("Invalid typed array length");return o.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(r),t.__proto__=o.prototype):(null===t&&(t=new o(r)),t.length=r),t}function o(t,r,e){if(!(o.TYPED_ARRAY_SUPPORT||this instanceof o))return new o(t,r,e);if("number"==typeof t){if("string"==typeof r)throw new Error("If encoding is specified then the first argument must be a string");return a(this,t)}return u(this,t,r,e)}function u(t,r,e,n){if("number"==typeof r)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&r instanceof ArrayBuffer?l(t,r,e,n):"string"==typeof r?h(t,r,e):p(t,r)}function s(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function f(t,r,e,n){return s(r),r<=0?i(t,r):void 0!==e?"string"==typeof n?i(t,r).fill(e,n):i(t,r).fill(e):i(t,r)}function a(t,r){if(s(r),t=i(t,r<0?0:0|g(r)),!o.TYPED_ARRAY_SUPPORT)for(var e=0;e<r;++e)t[e]=0;return t}function h(t,r,e){if("string"==typeof e&&""!==e||(e="utf8"),!o.isEncoding(e))throw new TypeError('"encoding" must be a valid string encoding');var n=0|y(r,e);t=i(t,n);var u=t.write(r,e);return u!==n&&(t=t.slice(0,u)),t}function c(t,r){var e=r.length<0?0:0|g(r.length);t=i(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}function l(t,r,e,n){if(r.byteLength,e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");return r=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n),o.TYPED_ARRAY_SUPPORT?(t=r,t.__proto__=o.prototype):t=c(t,r),t}function p(t,r){if(o.isBuffer(r)){var e=0|g(r.length);return t=i(t,e),0===t.length?t:(r.copy(t,0,0,e),t)}if(r){if("undefined"!=typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return"number"!=typeof r.length||X(r.length)?i(t,0):c(t,r);if("Buffer"===r.type&&K(r.data))return c(t,r.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function g(t){if(t>=n())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n().toString(16)+" bytes");return 0|t}function d(t){return+t!=t&&(t=0),o.alloc(+t)}function y(t,r){if(o.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var e=t.length;if(0===e)return 0;for(var n=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":case void 0:return q(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return W(t).length;default:if(n)return q(t).length;r=(""+r).toLowerCase(),n=!0}}function v(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if(e>>>=0,r>>>=0,e<=r)return"";for(t||(t="utf8");;)switch(t){case"hex":return O(this,r,e);case"utf8":case"utf-8":return P(this,r,e);case"ascii":return x(this,r,e);case"latin1":case"binary":return I(this,r,e);case"base64":return B(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return C(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function w(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function m(t,r,e,n,i){if(0===t.length)return-1;if("string"==typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,isNaN(e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return-1;e=t.length-1}else if(e<0){if(!i)return-1;e=0}if("string"==typeof r&&(r=o.from(r,n)),o.isBuffer(r))return 0===r.length?-1:b(t,r,e,n,i);if("number"==typeof r)return r&=255,o.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):b(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function b(t,r,e,n,i){function o(t,r){return 1===u?t[r]:t.readUInt16BE(r*u)}var u=1,s=t.length,f=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;u=2,s/=2,f/=2,e/=2}var a;if(i){var h=-1;for(a=e;a<s;a++)if(o(t,a)===o(r,-1===h?0:a-h)){if(-1===h&&(h=a),a-h+1===f)return h*u}else-1!==h&&(a-=a-h),h=-1}else for(e+f>s&&(e=s-f),a=e;a>=0;a--){for(var c=!0,l=0;l<f;l++)if(o(t,a+l)!==o(r,l)){c=!1;break}if(c)return a}return-1}function E(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n))>i&&(n=i):n=i;var o=r.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var u=0;u<n;++u){var s=parseInt(r.substr(2*u,2),16);if(isNaN(s))return u;t[e+u]=s}return u}function A(t,r,e,n){return $(q(r,t.length-e),t,e,n)}function R(t,r,e,n){return $(G(r),t,e,n)}function _(t,r,e,n){return R(t,r,e,n)}function U(t,r,e,n){return $(W(r),t,e,n)}function T(t,r,e,n){return $(J(r,t.length-e),t,e,n)}function B(t,r,e){return 0===r&&e===t.length?Z.fromByteArray(t):Z.fromByteArray(t.slice(r,e))}function P(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o=t[i],u=null,s=o>239?4:o>223?3:o>191?2:1;if(i+s<=e){var f,a,h,c;switch(s){case 1:o<128&&(u=o);break;case 2:128==(192&(f=t[i+1]))&&(c=(31&o)<<6|63&f)>127&&(u=c);break;case 3:f=t[i+1],a=t[i+2],128==(192&f)&&128==(192&a)&&(c=(15&o)<<12|(63&f)<<6|63&a)>2047&&(c<55296||c>57343)&&(u=c);break;case 4:f=t[i+1],a=t[i+2],h=t[i+3],128==(192&f)&&128==(192&a)&&128==(192&h)&&(c=(15&o)<<18|(63&f)<<12|(63&a)<<6|63&h)>65535&&c<1114112&&(u=c)}}null===u?(u=65533,s=1):u>65535&&(u-=65536,n.push(u>>>10&1023|55296),u=56320|1023&u),n.push(u),i+=s}return S(n)}function S(t){var r=t.length;if(r<=Q)return String.fromCharCode.apply(String,t);for(var e="",n=0;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=Q));return e}function x(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function I(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function O(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=V(t[o]);return i}function C(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function Y(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function L(t,r,e,n,i,u){if(!o.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<u)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function M(t,r,e,n){r<0&&(r=65535+r+1);for(var i=0,o=Math.min(t.length-e,2);i<o;++i)t[e+i]=(r&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function N(t,r,e,n){r<0&&(r=4294967295+r+1);for(var i=0,o=Math.min(t.length-e,4);i<o;++i)t[e+i]=r>>>8*(n?i:3-i)&255}function D(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function j(t,r,e,n,i){return i||D(t,r,e,4,3.4028234663852886e38,-3.4028234663852886e38),H.write(t,r,e,n,23,4),e+4}function k(t,r,e,n,i){return i||D(t,r,e,8,1.7976931348623157e308,-1.7976931348623157e308),H.write(t,r,e,n,52,8),e+8}function z(t){if(t=F(t).replace(tt,""),t.length<2)return"";for(;t.length%4!=0;)t+="=";return t}function F(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function V(t){return t<16?"0"+t.toString(16):t.toString(16)}function q(t,r){r=r||1/0;for(var e,n=t.length,i=null,o=[],u=0;u<n;++u){if((e=t.charCodeAt(u))>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(u+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320)}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function G(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}function J(t,r){for(var e,n,i,o=[],u=0;u<t.length&&!((r-=2)<0);++u)e=t.charCodeAt(u),n=e>>8,i=e%256,o.push(i),o.push(n);return o}function W(t){return Z.toByteArray(z(t))}function $(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}function X(t){return t!==t}var Z=e(15),H=e(17),K=e(18);r.Buffer=o,r.SlowBuffer=d,r.INSPECT_MAX_BYTES=50,o.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),r.kMaxLength=n(),o.poolSize=8192,o._augment=function(t){return t.__proto__=o.prototype,t},o.from=function(t,r,e){return u(null,t,r,e)},o.TYPED_ARRAY_SUPPORT&&(o.prototype.__proto__=Uint8Array.prototype,o.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&o[Symbol.species]===o&&Object.defineProperty(o,Symbol.species,{value:null,configurable:!0})),o.alloc=function(t,r,e){return f(null,t,r,e)},o.allocUnsafe=function(t){return a(null,t)},o.allocUnsafeSlow=function(t){return a(null,t)},o.isBuffer=function(t){return!(null==t||!t._isBuffer)},o.compare=function(t,r){if(!o.isBuffer(t)||!o.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var e=t.length,n=r.length,i=0,u=Math.min(e,n);i<u;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},o.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(t,r){if(!K(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return o.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=o.allocUnsafe(r),i=0;for(e=0;e<t.length;++e){var u=t[e];if(!o.isBuffer(u))throw new TypeError('"list" argument must be an Array of Buffers');u.copy(n,i),i+=u.length}return n},o.byteLength=y,o.prototype._isBuffer=!0,o.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)w(this,r,r+1);return this},o.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)w(this,r,r+3),w(this,r+1,r+2);return this},o.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)w(this,r,r+7),w(this,r+1,r+6),w(this,r+2,r+5),w(this,r+3,r+4);return this},o.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?P(this,0,t):v.apply(this,arguments)},o.prototype.equals=function(t){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===o.compare(this,t)},o.prototype.inspect=function(){var t="",e=r.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},o.prototype.compare=function(t,r,e,n,i){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),r<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&r>=e)return 0;if(n>=i)return-1;if(r>=e)return 1;if(r>>>=0,e>>>=0,n>>>=0,i>>>=0,this===t)return 0;for(var u=i-n,s=e-r,f=Math.min(u,s),a=this.slice(n,i),h=t.slice(r,e),c=0;c<f;++c)if(a[c]!==h[c]){u=a[c],s=h[c];break}return u<s?-1:s<u?1:0},o.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},o.prototype.indexOf=function(t,r,e){return m(this,t,r,e,!0)},o.prototype.lastIndexOf=function(t,r,e){return m(this,t,r,e,!1)},o.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r|=0,isFinite(e)?(e|=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return E(this,t,r,e);case"utf8":case"utf-8":return A(this,t,r,e);case"ascii":return R(this,t,r,e);case"latin1":case"binary":return _(this,t,r,e);case"base64":return U(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var Q=4096;o.prototype.slice=function(t,r){var e=this.length;t=~~t,r=void 0===r?e:~~r,t<0?(t+=e)<0&&(t=0):t>e&&(t=e),r<0?(r+=e)<0&&(r=0):r>e&&(r=e),r<t&&(r=t);var n;if(o.TYPED_ARRAY_SUPPORT)n=this.subarray(t,r),n.__proto__=o.prototype;else{var i=r-t;n=new o(i,void 0);for(var u=0;u<i;++u)n[u]=this[u+t]}return n},o.prototype.readUIntLE=function(t,r,e){t|=0,r|=0,e||Y(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},o.prototype.readUIntBE=function(t,r,e){t|=0,r|=0,e||Y(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},o.prototype.readUInt8=function(t,r){return r||Y(t,1,this.length),this[t]},o.prototype.readUInt16LE=function(t,r){return r||Y(t,2,this.length),this[t]|this[t+1]<<8},o.prototype.readUInt16BE=function(t,r){return r||Y(t,2,this.length),this[t]<<8|this[t+1]},o.prototype.readUInt32LE=function(t,r){return r||Y(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},o.prototype.readUInt32BE=function(t,r){return r||Y(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},o.prototype.readIntLE=function(t,r,e){t|=0,r|=0,e||Y(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*r)),n},o.prototype.readIntBE=function(t,r,e){t|=0,r|=0,e||Y(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*r)),o},o.prototype.readInt8=function(t,r){return r||Y(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},o.prototype.readInt16LE=function(t,r){r||Y(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},o.prototype.readInt16BE=function(t,r){r||Y(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},o.prototype.readInt32LE=function(t,r){return r||Y(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},o.prototype.readInt32BE=function(t,r){return r||Y(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},o.prototype.readFloatLE=function(t,r){return r||Y(t,4,this.length),H.read(this,t,!0,23,4)},o.prototype.readFloatBE=function(t,r){return r||Y(t,4,this.length),H.read(this,t,!1,23,4)},o.prototype.readDoubleLE=function(t,r){return r||Y(t,8,this.length),H.read(this,t,!0,52,8)},o.prototype.readDoubleBE=function(t,r){return r||Y(t,8,this.length),H.read(this,t,!1,52,8)},o.prototype.writeUIntLE=function(t,r,e,n){t=+t,r|=0,e|=0,n||L(this,t,r,e,Math.pow(2,8*e)-1,0);var i=1,o=0;for(this[r]=255&t;++o<e&&(i*=256);)this[r+o]=t/i&255;return r+e},o.prototype.writeUIntBE=function(t,r,e,n){t=+t,r|=0,e|=0,n||L(this,t,r,e,Math.pow(2,8*e)-1,0);var i=e-1,o=1;for(this[r+i]=255&t;--i>=0&&(o*=256);)this[r+i]=t/o&255;return r+e},o.prototype.writeUInt8=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,1,255,0),o.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=255&t,r+1},o.prototype.writeUInt16LE=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,2,65535,0),o.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):M(this,t,r,!0),r+2},o.prototype.writeUInt16BE=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,2,65535,0),o.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):M(this,t,r,!1),r+2},o.prototype.writeUInt32LE=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,4,4294967295,0),o.TYPED_ARRAY_SUPPORT?(this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t):N(this,t,r,!0),r+4},o.prototype.writeUInt32BE=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,4,4294967295,0),o.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):N(this,t,r,!1),r+4},o.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r|=0,!n){var i=Math.pow(2,8*e-1);L(this,t,r,e,i-1,-i)}var o=0,u=1,s=0;for(this[r]=255&t;++o<e&&(u*=256);)t<0&&0===s&&0!==this[r+o-1]&&(s=1),this[r+o]=(t/u>>0)-s&255;return r+e},o.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r|=0,!n){var i=Math.pow(2,8*e-1);L(this,t,r,e,i-1,-i)}var o=e-1,u=1,s=0;for(this[r+o]=255&t;--o>=0&&(u*=256);)t<0&&0===s&&0!==this[r+o+1]&&(s=1),this[r+o]=(t/u>>0)-s&255;return r+e},o.prototype.writeInt8=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,1,127,-128),o.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[r]=255&t,r+1},o.prototype.writeInt16LE=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,2,32767,-32768),o.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):M(this,t,r,!0),r+2},o.prototype.writeInt16BE=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,2,32767,-32768),o.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):M(this,t,r,!1),r+2},o.prototype.writeInt32LE=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,4,2147483647,-2147483648),o.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24):N(this,t,r,!0),r+4},o.prototype.writeInt32BE=function(t,r,e){return t=+t,r|=0,e||L(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),o.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):N(this,t,r,!1),r+4},o.prototype.writeFloatLE=function(t,r,e){return j(this,t,r,!0,e)},o.prototype.writeFloatBE=function(t,r,e){return j(this,t,r,!1,e)},o.prototype.writeDoubleLE=function(t,r,e){return k(this,t,r,!0,e)},o.prototype.writeDoubleBE=function(t,r,e){return k(this,t,r,!1,e)},o.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i,u=n-e;if(this===t&&e<r&&r<n)for(i=u-1;i>=0;--i)t[i+r]=this[i+e];else if(u<1e3||!o.TYPED_ARRAY_SUPPORT)for(i=0;i<u;++i)t[i+r]=this[i+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+u),r);return u},o.prototype.fill=function(t,r,e,n){if("string"==typeof t){if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!o.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0);var u;if("number"==typeof t)for(u=r;u<e;++u)this[u]=t;else{var s=o.isBuffer(t)?t:q(new o(t,n).toString()),f=s.length;for(u=0;u<e-r;++u)this[u+r]=s[u%f]}return this};var tt=/[^+\/0-9A-Za-z-_]/g}).call(r,e(6))},17:function(t,r){r.read=function(t,r,e,n,i){var o,u,s=8*i-n-1,f=(1<<s)-1,a=f>>1,h=-7,c=e?i-1:0,l=e?-1:1,p=t[r+c];for(c+=l,o=p&(1<<-h)-1,p>>=-h,h+=s;h>0;o=256*o+t[r+c],c+=l,h-=8);for(u=o&(1<<-h)-1,o>>=-h,h+=n;h>0;u=256*u+t[r+c],c+=l,h-=8);if(0===o)o=1-a;else{if(o===f)return u?NaN:1/0*(p?-1:1);u+=Math.pow(2,n),o-=a}return(p?-1:1)*u*Math.pow(2,o-n)},r.write=function(t,r,e,n,i,o){var u,s,f,a=8*o-i-1,h=(1<<a)-1,c=h>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,g=n?1:-1,d=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(s=isNaN(r)?1:0,u=h):(u=Math.floor(Math.log(r)/Math.LN2),r*(f=Math.pow(2,-u))<1&&(u--,f*=2),r+=u+c>=1?l/f:l*Math.pow(2,1-c),r*f>=2&&(u++,f/=2),u+c>=h?(s=0,u=h):u+c>=1?(s=(r*f-1)*Math.pow(2,i),u+=c):(s=r*Math.pow(2,c-1)*Math.pow(2,i),u=0));i>=8;t[e+p]=255&s,p+=g,s/=256,i-=8);for(u=u<<i|s,a+=i;a>0;t[e+p]=255&u,p+=g,u/=256,a-=8);t[e+p-g]|=128*d}},18:function(t,r){var e={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==e.call(t)}},20:function(t,r){t.exports=function(t){var r="undefined"!=typeof window&&window.location;if(!r)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var e=r.protocol+"//"+r.host,n=e+r.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,r){var i=r.trim().replace(/^"(.*)"$/,function(t,r){return r}).replace(/^'(.*)'$/,function(t,r){return r});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return t;var o;return o=0===i.indexOf("//")?i:0===i.indexOf("/")?e+i:n+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}},53:function(t,r,e){var n,i;n=[e,r,e(0),e(66),e(60)],void 0!==(i=function(t,r,e,n){"use strict";function i(t){if(!t)return{displayName:"",uniqueName:"",imageUrl:""};var r=t.lastIndexOf("<"),e=t.lastIndexOf(">"),i=t,u="",s="",f="";if(r>=0&&e>r&&e===t.length-1){i=t.substr(0,r).trim(),s=t.substr(r+1,e-r-1).trim();var a=o(s);-1!==s.indexOf("@")||-1!==s.indexOf("\\")||a||n.isGuid(s)?(u=s,""!=a&&(f=a,u="")):i=t}var h="";return f?h=VSS.getWebContext().host.uri+"/_api/_common/IdentityImage?id="+f:u&&(h=VSS.getWebContext().host.uri+"/_api/_common/IdentityImage?identifier="+u+"&identifierType=0"),{displayName:i,uniqueName:u,imageUrl:h}}function o(t){var r;if(!t)return"";var e="",i=t.lastIndexOf("\\");if(r=-1===i?t:t.substr(0,i),n.startsWith(r,"id:")){var o=r.substr(3).trim();e=n.isGuid(o)?o:""}return e}Object.defineProperty(r,"__esModule",{value:!0}),r.IdentityView=function(t){var r="",n="",o=i(t.identityDistinctName);return r=o.displayName,n=o.imageUrl,r?e.createElement("div",{className:"identity-view overflow-ellipsis",title:t.identityDistinctName},""!==n&&e.createElement("img",{src:n}),e.createElement("span",null,r)):e.createElement("div",{className:"overflow-ellipsis",title:""})}}.apply(r,n))&&(t.exports=i)},6:function(t,r){var e;e=function(){return this}();try{e=e||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(e=window)}t.exports=e},60:function(t,r,e){var n=e(67);"string"==typeof n&&(n=[[t.i,n,""]]),e(8)(n,{}),n.locals&&(t.exports=n.locals)},66:function(t,e){t.exports=r},67:function(t,r,e){r=t.exports=e(7)(void 0),r.push([t.i,".overflow-ellipsis{text-overflow:ellipsis;width:100%;overflow:hidden;white-space:nowrap;word-wrap:normal}.callout-container{max-height:200px}.identity-view img{margin-right:2px;vertical-align:top;width:18px;height:18px}",""])},7:function(t,r,e){(function(r){function e(t,r){var e=t[1]||"",i=t[3];if(!i)return e;if(r){var o=n(i);return[e].concat(i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})).concat([o]).join("\n")}return[e].join("\n")}function n(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+new r(JSON.stringify(t)).toString("base64")+" */"}t.exports=function(t){var r=[];return r.toString=function(){return this.map(function(r){var n=e(r,t);return r[2]?"@media "+r[2]+"{"+n+"}":n}).join("")},r.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(n[o]=!0)}for(i=0;i<t.length;i++){var u=t[i];"number"==typeof u[0]&&n[u[0]]||(e&&!u[2]?u[2]=e:e&&(u[2]="("+u[2]+") and ("+e+")"),r.push(u))}},r}}).call(r,e(16).Buffer)},8:function(t,r,e){function n(t,r){for(var e=0;e<t.length;e++){var n=t[e],i=g[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(h(n.parts[o],r))}else{for(var u=[],o=0;o<n.parts.length;o++)u.push(h(n.parts[o],r));g[n.id]={id:n.id,refs:1,parts:u}}}}function i(t){for(var r=[],e={},n=0;n<t.length;n++){var i=t[n],o=i[0],u=i[1],s=i[2],f=i[3],a={css:u,media:s,sourceMap:f};e[o]?e[o].parts.push(a):r.push(e[o]={id:o,parts:[a]})}return r}function o(t,r){var e=y(t.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=m[m.length-1];if("top"===t.insertAt)n?n.nextSibling?e.insertBefore(r,n.nextSibling):e.appendChild(r):e.insertBefore(r,e.firstChild),m.push(r);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");e.appendChild(r)}}function u(t){t.parentNode.removeChild(t);var r=m.indexOf(t);r>=0&&m.splice(r,1)}function s(t){var r=document.createElement("style");return t.attrs.type="text/css",a(r,t.attrs),o(t,r),r}function f(t){var r=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",a(r,t.attrs),o(t,r),r}function a(t,r){Object.keys(r).forEach(function(e){t.setAttribute(e,r[e])})}function h(t,r){var e,n,i;if(r.singleton){var o=w++;e=v||(v=s(r)),n=c.bind(null,e,o,!1),i=c.bind(null,e,o,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=f(r),n=p.bind(null,e,r),i=function(){u(e),e.href&&URL.revokeObjectURL(e.href)}):(e=s(r),n=l.bind(null,e),i=function(){u(e)});return n(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;n(t=r)}else i()}}function c(t,r,e,n){var i=e?"":n.css;if(t.styleSheet)t.styleSheet.cssText=E(r,i);else{var o=document.createTextNode(i),u=t.childNodes;u[r]&&t.removeChild(u[r]),u.length?t.insertBefore(o,u[r]):t.appendChild(o)}}function l(t,r){var e=r.css,n=r.media;if(n&&t.setAttribute("media",n),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}function p(t,r,e){var n=e.css,i=e.sourceMap,o=void 0===r.convertToAbsoluteUrls&&i;(r.convertToAbsoluteUrls||o)&&(n=b(n)),i&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var u=new Blob([n],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(u),s&&URL.revokeObjectURL(s)}var g={},d=function(t){var r;return function(){return void 0===r&&(r=t.apply(this,arguments)),r}}(function(){return window&&document&&document.all&&!window.atob}),y=function(t){var r={};return function(e){return void 0===r[e]&&(r[e]=t.call(this,e)),r[e]}}(function(t){return document.querySelector(t)}),v=null,w=0,m=[],b=e(20);t.exports=function(t,r){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");r=r||{},r.attrs="object"==typeof r.attrs?r.attrs:{},void 0===r.singleton&&(r.singleton=d()),void 0===r.insertInto&&(r.insertInto="head"),void 0===r.insertAt&&(r.insertAt="bottom");var e=i(t);return n(e,r),function(t){for(var o=[],u=0;u<e.length;u++){var s=e[u],f=g[s.id];f.refs--,o.push(f)}t&&n(i(t),r);for(var u=0;u<o.length;u++){var f=o[u];if(0===f.refs){for(var a=0;a<f.parts.length;a++)f.parts[a]();delete g[f.id]}}}};var E=function(){var t=[];return function(r,e){return t[r]=e,t.filter(Boolean).join("\n")}}()}})});