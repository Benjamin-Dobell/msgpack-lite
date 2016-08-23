// bufferish-buffer.js

import { getBufferImplementation } from "./buffer-implementation.js";
import { hasBuffer, isBuffer, isArrayBuffer } from "./bufferish-checks.js";
import * as BufferishUInt8Array from "./bufferish-uint8array.js";
import { autoConvertFrom } from "./bufferish-autoConvertFrom.js";
import { registerAlloc, registerConvertFrom } from './bufferish-factory.js';

var shared = function() {
  var value;

  return function() {
    if (!value) {
      value = hasArrayBuffer() ? alloc(0) : [];
    }

    return value;
  }
};

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

var alloc = hasBuffer() ? Buffer.alloc : function (size) {
  return new Buffer(size);
};

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer}
 */

function from(value) {
  if (!isBuffer(value) && isView(value)) {
    // TypedArray to Uint8Array
    value = BufferishUInt8Array.from(value);
  } else if (isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Buffer
    return autoConvertFrom(shared(), value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  var Buffer = getBufferImplementation();

  // Array-like to Buffer
  if (Buffer.from && Buffer.from.length !== 1) {
    return Buffer.from(value); // node v6+
  } else {
    return new Buffer(value); // node v4
  }
}

registerAlloc('Buffer', alloc);
registerConvertFrom('Buffer', from);

export { alloc, from };
export { concat } from './bufferish-common.js';
