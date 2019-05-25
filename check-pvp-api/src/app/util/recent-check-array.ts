import { SearchHistory } from "../../../../check-pvp-common/models";

export default class RecentCheckArray {
    private buffer: SearchHistory[];
    private maxLength: number;

    constructor(len: number) {
        this.buffer = [];
        this.maxLength = len;
    }

    add(val: SearchHistory) {
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

    toString(): string {
        return this.buffer.toString();
    }
}