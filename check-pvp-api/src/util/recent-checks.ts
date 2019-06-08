import { SearchHistory } from '../../../check-pvp-common/models';
import { EventEmitter } from 'events';

export class RecentChecks {
    private readonly MAX_LEN: number;
    private readonly REPORT_INTERVAL_MS = 10000;
    private reportInterval: NodeJS.Timeout;
    private buffer: SearchHistory[];

    readonly emitter = new EventEmitter();

    constructor(len: number) {
        this.buffer = [];
        this.MAX_LEN = len;
        this.reportInterval = setInterval(
            () => console.log('Recent checks:', this.buffer),
            this.REPORT_INTERVAL_MS
        );
    }

    add(val: SearchHistory) {
        const index = this.buffer.findIndex(
            item =>
                item.name === val.name &&
                item.realm === val.realm &&
                item.region === val.region
        );
        if (index !== -1) {
            this.buffer.splice(index);
        } else if (this.buffer.length === this.MAX_LEN) {
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
