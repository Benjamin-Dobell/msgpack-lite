var allocs = {};
var convertFroms = {};

export function registerAlloc(name, alloc) {
    allocs[name] = alloc;
}

export function registerConvertFrom(name, convertFrom) {
    convertFroms[name] = convertFrom;
}

export function alloc(name, size) {
    return allocs[name](size);
}

export function convertFrom(name, obj) {
    return convertFroms[name](obj);
}
