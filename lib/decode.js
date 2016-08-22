// decode.js

import { DecodeBuffer } from "./decode-buffer.js";

function decode(input, options) {
  var decoder = new DecodeBuffer(options);
  decoder.write(input);
  return decoder.read();
}

export { decode };