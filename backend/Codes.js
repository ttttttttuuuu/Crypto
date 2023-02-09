class Codes {
  constructor() {
    this.minute = 5; // 等待幾分鐘
    this.length = 6; // 驗證碼長度
    this.codes = {};
    this.timeouts = {};
  }
  setTimeoutToRemoveCode(id) {
    this.timeouts[id] = setTimeout(() => {
      delete this.codes[id];
      delete this.timeouts[id];
    }, this.minute * 60 * 1000);
  }
  newCode(id) {
    if (this.codes[id] != undefined) {
      clearTimeout(this.timeouts[id]);
      delete this.timeouts[id];
    }
    this.codes[id] = Math.random()
      .toString(36)
      .slice(-this.length)
      .toUpperCase();
    this.setTimeoutToRemoveCode(id);
    return this.codes[id];
  }
  verify(id, code) {
    return this.codes[id] === code;
  }
}

module.exports = Codes;
