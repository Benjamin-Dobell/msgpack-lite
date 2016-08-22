// ext-buffer.js

import * as Bufferish from "./bufferish.js";

function ExtBuffer(buffer, type) {
  if (!(this instanceof ExtBuffer)) return new ExtBuffer(buffer, type);
  this.buffer = Bufferish.from(buffer);
  this.type = type;
}

export { ExtBuffer };
