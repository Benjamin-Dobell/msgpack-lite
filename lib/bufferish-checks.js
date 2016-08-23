import { getBufferImplementation } from "./buffer-implementation.js";

function _is(name, key) {
    /* jshint eqnull:true */
    name = "[object " + name + "]";
    return function(value) {
        return (value != null) && {}.toString.call(key ? value[key] : value) === name;
    };
}

var hasBuffer = function() {
    var Buffer = getBufferImplementation();
    return Buffer && !!Buffer.isBuffer;
};

var isBuffer = function(value) {
    var Buffer = getBufferImplementation();
    return hasBuffer() ? Buffer.isBuffer(value) : false;
};

var _hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);
var hasArrayBuffer = function() {
    return _hasArrayBuffer;
};

var _isArrayBuffer = _is("ArrayBuffer");
var isArrayBuffer = function(value){
    return _hasArrayBuffer && (value instanceof ArrayBuffer || _isArrayBuffer(value));
};

var isView = function(value) {
    if (hasArrayBuffer()) {
        return ArrayBuffer.isView ? ArrayBuffer.isView(value) : _is("ArrayBuffer", "buffer")(value);
    } else {
        return false;
    }
};

export { hasBuffer, isBuffer, hasArrayBuffer, isArrayBuffer, isView };
