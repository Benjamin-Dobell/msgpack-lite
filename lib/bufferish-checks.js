import { default as Buffer } from "./buffer-global.js";

function _is(name, key) {
    /* jshint eqnull:true */
    name = "[object " + name + "]";
    return function(value) {
        return (value != null) && {}.toString.call(key ? value[key] : value) === name;
    };
}

function _false() {
    return false;
}

var hasBuffer = Buffer && !!Buffer.isBuffer;
var isBuffer = hasBuffer ? Buffer.isBuffer : _false;

var hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);
var _isArrayBuffer = _is("ArrayBuffer");
var isArrayBuffer = hasArrayBuffer ? function(value) {
    return (value instanceof ArrayBuffer) || _isArrayBuffer(value);
} : _false;

var isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

export { hasBuffer, isBuffer, hasArrayBuffer, isArrayBuffer, isView };
