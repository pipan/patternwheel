export class Decelerator {
    constructor (decrement) {
        this.decrement = decrement
        this.listeners = [];
        this.timeout = null;
    }

    connect (fn) {
        this.listeners.push(fn);
    }

    trigger (value) {
        for (const listener of this.listeners) {
            listener(value);
        }
    }

    start (value) {
        this.stop();

        this.timeout = setInterval(() => {
            if (Math.abs(value) < this.decrement) {
                this.stop();
                return;
            }
            if (value < 0) {
                value += this.decrement;
            } else {
                value -= this.decrement;
            }
            this.trigger(value)
        }, 20);
    }

    stop () {
        if (this.timeout === null) {
            return;
        }
        clearTimeout(this.timeout);
        this.timeout = null;
    }
}