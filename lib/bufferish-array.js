// bufferish-array.js

import { isBuffer, isArrayBuffer, isView } from "./bufferish-checks.js";
import * as BufferishUInt8Array from "./bufferish-uint8array.js";
import { autoConvertFrom } from "./bufferish-autoConvertFrom.js";
import { registerAlloc, registerConvertFrom } from './bufferish-factory.js';

var shared = alloc(0);

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Array}
 */

function from(value) {
  if (!isBuffer(value) && isView(value)) {
    // TypedArray to Uint8Array
    value = BufferishUInt8Array.from(value);
  } else if (isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Array
    return autoConvertFrom(shared, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Array
  return Array.prototype.slice.call(value);
}

registerAlloc('Array', alloc);
registerConvertFrom('Array', from);

export { alloc, from };
export { concat } from './bufferish-common.js';
