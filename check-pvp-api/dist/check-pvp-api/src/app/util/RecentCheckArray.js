"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecentCheckArray {
    constructor(len) {
        this.buffer = [];
        this.maxLength = len;
    }
    add(val) {
        const index = this.buffer.findIndex(item => item.id === val.id);
        if (index !== -1) {
            this.buffer.splice(index);
        }
        else if (this.buffer.length === this.maxLength) {
            this.buffer.pop();
        }
        this.buffer.unshift(val);
    }
    getArray() {
        return this.buffer;
    }
    toString() {
        return this.buffer.toString();
    }
}
exports.default = RecentCheckArray;
//# sourceMappingURL=RecentCheckArray.js.map