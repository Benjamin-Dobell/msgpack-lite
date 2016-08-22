/* globals Buffer */

function c(B) {
  return B && B.isBuffer && B;
}

var buffer =
    c(("undefined" !== typeof Buffer) && Buffer) ||
    c(this.Buffer) ||
    c(("undefined" !== typeof window) && window.Buffer) ||
    this.Buffer;

export default buffer;
