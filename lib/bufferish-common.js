import { autoAlloc } from './bufferish-autoAlloc.js';

/**
 * @param list {Array} array of (Buffer|Uint8Array|Array)s
 * @param [length]
 * @returns {Buffer|Uint8Array|Array}
 */

export function concat(list, length) {
    if (!length) {
        length = 0;
        Array.prototype.forEach.call(list, dryrun);
    }
    var ref = (typeof this !== 'undefined') && this || list[0];
    var result = autoAlloc(ref, length);
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
