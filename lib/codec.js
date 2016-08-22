// codec.js

// load both interfaces
import "./read-core.js";
import "./write-core.js";

import { preset } from "./codec-base.js";

// @public
// msgpack.codec.preset

var codec = {
  preset: preset
};

export { codec };
