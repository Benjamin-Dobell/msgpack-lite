// write-unit8.js

var constant = new Array(256);

function write0(type) {
  return function(encoder) {
    var offset = encoder.reserve(1);
    encoder.buffer[offset] = type;
  };
}

for (var i = 0x00; i <= 0xFF; i++) {
  constant[i] = write0(i);
}

export { constant as uint8 };
