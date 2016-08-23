// bufferish.js

import { default as isArray } from "isarray";

import { default as Buffer } from "./buffer-global.js";
import { hasBuffer, isBuffer, hasArrayBuffer, isArrayBuffer, isView } from "./bufferish-checks.js";
import { concat } from './bufferish-common.js';

import * as BufferArray from "./bufferish-array.js";
import * as BufferBuffer from "./bufferish-buffer.js";
import * as BufferUint8Array from "./bufferish-uint8array.js";
import * as BufferProto from "./bufferish-proto.js";

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
