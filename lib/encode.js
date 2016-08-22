// encode.js

import { EncodeBuffer } from "./encode-buffer.js";

export function encode(input, options) {
  var encoder = new EncodeBuffer(options);
  encoder.write(input);
  return encoder.read();
}
