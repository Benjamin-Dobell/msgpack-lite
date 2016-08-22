// bufferish-buffer.js

import * as Bufferish from "./bufferish.js";
var Buffer = Bufferish.global;

var arr = Bufferish.hasBuffer ? alloc(0) : [];

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

var alloc = Bufferish.hasBuffer ? Buffer.alloc : function (size) {
  return new Buffer(size);
};

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Buffer
    return Bufferish.from.call(arr, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Buffer
  if (Buffer.from && Buffer.from.length !== 1) {
    return Buffer.from(value); // node v6+
  } else {
    return new Buffer(value); // node v4
  }
}

export { alloc, from };
export { concat } from './bufferish.js';
