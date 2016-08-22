// bufferish.js

import { default as isArray } from "isarray";

import { default as Buffer } from "./buffer-global.js";

import * as BufferArray from "./bufferish-array.js";
import * as BufferBuffer from "./bufferish-buffer.js";
import * as BufferUint8Array from "./bufferish-uint8array.js";
import * as BufferProto from "./bufferish-proto.js";

var hasBuffer = Buffer && !!Buffer.isBuffer;
var hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

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

var _isArrayBuffer = _is("ArrayBuffer");

var isArrayBuffer = hasArrayBuffer ? function(value) {
  return (value instanceof ArrayBuffer) || _isArrayBuffer(value);
} : _false;

var isBuffer = hasBuffer ? Buffer.isBuffer : _false;
var isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer|Uint8Array|Array}
 */

function from(value) {
  if (typeof value === "string") {
    return fromString.call(this, value);
  } else {
    return auto(this).from(value);
  }
}

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return auto(this).alloc(size);
}

/**
 * @param list {Array} array of (Buffer|Uint8Array|Array)s
 * @param [length]
 * @returns {Buffer|Uint8Array|Array}
 */

function concat(list, length) {
  if (!length) {
    length = 0;
    Array.prototype.forEach.call(list, dryrun);
  }
  var ref = (typeof this !== 'undefined') && this || list[0];
  var result = alloc.call(ref, length);
  var offset = 0;
  Array.prototype.forEach.call(list, append);
  return result;

  function dryrun(buffer) {
    length += buffer.length;
  }

  function append(buffer) {
    offset += BufferProto.copy.call(buffer, result, offset);
  }
}

/**
 * @private
 */

function fromString(value) {
  var expected = value.length * 3;
  var that = alloc.call(this, expected);
  var actual = BufferProto.write.call(that, value);
  if (expected !== actual) {
    that = BufferProto.slice.call(that, 0, actual);
  }
  return that;
}

function auto(that) {
  return isBuffer(that) ? BufferBuffer
    : isView(that) ? BufferUint8Array
    : isArray(that) ? BufferArray
    : hasBuffer ? BufferBuffer
    : hasArrayBuffer ? BufferUint8Array
    : BufferArray;
}

export {
  Buffer as global,
  hasBuffer,
  hasArrayBuffer,
  isArray,
  isArrayBuffer,
  isBuffer,
  isView,
  alloc,
  concat,
  from,
  BufferArray as Array,
  BufferBuffer as Buffer,
  BufferUint8Array as Uint8Array,
  BufferProto as prototype
};
