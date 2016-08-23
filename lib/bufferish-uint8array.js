// bufferish-uint8array.js

import { hasArrayBuffer, isView } from "./bufferish-checks.js";
import { autoConvertFrom } from './bufferish-autoConvertFrom.js';
import { registerAlloc, registerConvertFrom } from './bufferish-factory.js';

var arr = hasArrayBuffer ? alloc(0) : [];

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Uint8Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Uint8Array}
 */

function from(value) {
  if (isView(value)) {
    // TypedArray to ArrayBuffer
    var byteOffset = value.byteOffset;
    var byteLength = value.byteLength;
    value = value.buffer;
    if (value.byteLength !== byteLength) {
      if (value.slice) {
        value = value.slice(byteOffset, byteOffset + byteLength);
      } else {
        // Android 4.1 does not have ArrayBuffer.prototype.slice
        value = new Uint8Array(value);
        if (value.byteLength !== byteLength) {
          // TypedArray to ArrayBuffer to Uint8Array to Array
          value = Array.prototype.slice.call(value, byteOffset, byteOffset + byteLength);
        }
      }
    }
  } else if (typeof value === "string") {
    // String to Uint8Array
    return autoConvertFrom(arr, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  return new Uint8Array(value);
}

registerAlloc('Uint8Array', alloc);
registerConvertFrom('Uint8Array', from);

export { alloc, from };
export { concat } from './bufferish-common.js';
