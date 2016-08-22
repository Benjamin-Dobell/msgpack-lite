// decode-stream.js

import * as util from "util";
import { Transform } from "stream";

import { DecodeBuffer } from "./decode-buffer.js";

util.inherits(DecodeStream, Transform);

var DEFAULT_OPTIONS = {objectMode: true};

function DecodeStream(options) {
  if (!(this instanceof DecodeStream)) return new DecodeStream(options);
  if (options) {
    options.objectMode = true;
  } else {
    options = DEFAULT_OPTIONS;
  }
  Transform.call(this, options);
  var stream = this;
  var decoder = this.decoder = new DecodeBuffer(options);
  decoder.push = function(chunk) {
    stream.push(chunk);
  };
}

DecodeStream.prototype._transform = function(chunk, encoding, callback) {
  this.decoder.write(chunk);
  this.decoder.flush();
  if (callback) callback();
};

export { DecodeStream as createDecodeStream };
