import { hasBuffer, isBuffer, hasArrayBuffer, isView } from "./bufferish-checks.js";
import { write, slice } from "./bufferish-proto.js";
import * as Factory from "./bufferish-factory.js";

function fromString(value) {
    var expected = value.length * 3;
    var that = autoAlloc(this, expected);
    var actual = write.call(that, value);
    if (expected !== actual) {
        that = slice.call(that, 0, actual);
    }
    return that;
}

export function autoConvertFrom(that, value) {
    return typeof value === "string" ? fromString.call(that, value)
        : isBuffer(that) ? Factory.convertFrom('Buffer', value)
        : isView(that) ? Factory.convertFrom('Uint8Array', value)
        : isArray(that) ? Factory.convertFrom('Array', value)
        : hasBuffer ? Factory.convertFrom('Buffer', value)
        : hasArrayBuffer ? Factory.convertFrom('Uint8Array', value)
        : Factory.convertFrom('Array', value);
}
