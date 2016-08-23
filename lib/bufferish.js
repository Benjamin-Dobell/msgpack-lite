// bufferish.js

import { default as isArray } from "isarray";

import { hasBuffer, isBuffer, hasArrayBuffer, isArrayBuffer, isView } from "./bufferish-checks.js";
import { concat } from './bufferish-common.js';

import * as BufferArray from "./bufferish-array.js";
import * as BufferBuffer from "./bufferish-buffer.js";
import * as BufferUint8Array from "./bufferish-uint8array.js";
import * as BufferProto from "./bufferish-proto.js";

import { setBufferImplementation } from "./buffer-implementation.js";

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer|Uint8Array|Array}
 */

function from(value) {
  return autoConvertFrom(this, value);
}

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return autoAlloc(this, size);
}

/* globals Buffer */

function c(B) {
  return B && B.isBuffer && B;
}

var global =
  c(("undefined" !== typeof Buffer) && Buffer) ||
  c(BufferBuffer) ||
  c(("undefined" !== typeof window) && window.Buffer) ||
  BufferBuffer;

setBufferImplementation(global);

// hasBuffer() and hasArrayBuffer() are only valid after setBufferImplementation(),
// so they're used dynamically through-out the codebase. Nonetheless, the CommonJS
// build exposed these as constants, so we're doing the same (now that it's safe).

var _hasBuffer = hasBuffer();
var _hasArrayBuffer = hasArrayBuffer();

export {
  global,
  _hasBuffer as hasBuffer,
  _hasArrayBuffer as hasArrayBuffer,
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
