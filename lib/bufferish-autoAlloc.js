import { hasBuffer, isBuffer, hasArrayBuffer, isView } from "./bufferish-checks.js";
import * as Factory from "./bufferish-factory.js";

export function autoAlloc(that, size) {
    return isBuffer(that) ? Factory.alloc('Buffer', size)
        : isView(that) ? Factory.alloc('Uint8Array', size)
        : isArray(that) ? Factory.alloc('Array', size)
        : hasBuffer ? Factory.alloc('Buffer', size)
        : hasArrayBuffer ? Factory.alloc('Uint8Array', size)
        : Factory.alloc('Array', size);
}