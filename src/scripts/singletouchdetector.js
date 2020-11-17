import { Decelerator } from './decelerator';

export class SingleTouchDetector {
    constructor () {
        this.listeners = [];
        this.currentPosition = null;
        this.velocity = 0;
        this.decelerator = new Decelerator(4);
        this.decelerator.connect((value) => {
            this.trigger({
                x: this.currentPosition.x,
                y: this.currentPosition.y + value
            });
        })

        document.addEventListener('touchstart', (e) => {
            this.decelerator.stop();
            this.velocity = 0;
            if (e.changedTouches.length === 1) {
                this.currentPosition = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                }
            } else {
                this.currentPosition = null;
            }
        }, {passive: true});
        document.addEventListener('touchend', (e) => {
            const normalize = Math.min(Math.max(this.velocity, -100), 100);
            this.decelerator.start(normalize);
        }, {passive: true});
        document.addEventListener('touchmove', (e) => {
            this.velocity = e.changedTouches[0].clientY - this.currentPosition.y;
            this.trigger({
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            });
        }, {passive: true});
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