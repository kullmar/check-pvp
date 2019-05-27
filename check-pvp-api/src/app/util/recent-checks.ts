import { SearchHistory } from '../../../../check-pvp-common/models';
import { EventEmitter } from 'events';

export class RecentChecks {
    private buffer: SearchHistory[];
    private readonly maxLength: number;

    readonly emitter = new EventEmitter();

    constructor(len: number) {
        this.buffer = [];
        this.maxLength = len;
    }

    add(val: SearchHistory) {
        const index = this.buffer.findIndex(item => item.id === val.id);
        if (index !== -1) {
            this.buffer.splice(index);
        } else if (this.buffer.length === this.maxLength) {
            this.buffer.pop();
        }
        this.buffer.unshift(val);

        if (index !== -1) {
            this.emitter.emit('update', {
                index: index,
                timestamp: val.timestamp,
            });
        } else {
            this.emitter.emit('new', val);
        }
    }

    getArray() {
        return this.buffer;
    }

    toString(): string {
        return this.buffer.toString();
    }
}

export default new RecentChecks(30);