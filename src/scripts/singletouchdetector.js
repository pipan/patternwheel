export class SingleTouchDetector {
    constructor () {
        this.listeners = [];
        this.currentPosition = null;

        document.addEventListener('touchstart', (e) => {
            if (e.changedTouches.length === 1) {
                this.currentPosition = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                }
            } else {
                this.currentPosition = null;
            }
        });
        document.addEventListener('touchmove', (e) => {
            this.trigger({
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            });
        });
    }

    connect (fn) {
        this.listeners.push(fn);
    }

    trigger (position) {
        if (this.currentPosition === null) {
            return;
        }
        const delta = {
            x: this.currentPosition.x - position.x,
            y: this.currentPosition.y - position.y
        }
        for (const listener of this.listeners) {
            listener(delta);
        }
        this.currentPosition = position;
    }
}