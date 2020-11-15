var SingleTouchDetector = function () {
    this.listeners = [];
    this.currentPosition = null;

    this.connect = function (fn) {
        this.listeners.push(fn);
    }

    this.trigger = function (position) {
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

function createArc(fromDeg, toDeg, radius) {
    var arc = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    let start = {
        x: 200 + Math.cos(Math.PI * fromDeg / 180) * radius,
        y: 200 + Math.sin(Math.PI * fromDeg / 180) * radius,
    }
    let end = {
        x: 200 + Math.cos(Math.PI * toDeg / 180) * radius,
        y: 200 + Math.sin(Math.PI * toDeg / 180) * radius,
    }
    arc.setAttribute("d","M" + start.x + " " + start.y + " A" + radius + " " + radius + " 0 0 1 " + end.x + " " + end.y);
    return arc;
}

function createInnerCircle() {
    const elements = [];
    const radius = 150;
    const gap = 2.5;
    const innerPrototypes = [
        {
            degSize: 5 * 360 / 23,
            class: ['creational-fill', 'wheel__inner']
        }, {
            degSize: 7 * 360 / 23,
            class: ['structural-fill', 'wheel__inner']
        }, {
            degSize: 11 * 360 / 23,
            class: ['behavioral-fill', 'wheel__inner']
        }
    ];

    let anglePosition = -8;
    for (const innerPrototype of innerPrototypes) {
        const degSize = innerPrototype.degSize - 2 * gap;
        const innerElement = createArc(anglePosition + gap, anglePosition + gap + degSize, radius);
        anglePosition += innerPrototype.degSize;
        innerElement.classList.add(...innerPrototype.class);
        elements.push(innerElement);
    }

    const radiusText = 142;
    const innerTexts = [
        {
            startDeg: 15,
            endDeg: 60,
            id: 'creational-text-path',
            text: 'Creational'
        }, {
            startDeg: 109,
            endDeg: 160,
            id: 'structural-text-path',
            text: 'Structural'
        }, {
            startDeg: 248,
            endDeg: 340,
            id: 'beahvioral-text-path',
            text: 'Behavioral'
        }
    ];

    for (const innerText of innerTexts) {
        const innerElement = createArc(innerText.startDeg, innerText.endDeg, radiusText);
        innerElement.id = innerText.id;
        elements.push(innerElement);

        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('fill', 'white')
        var textpath = document.createElementNS("http://www.w3.org/2000/svg","textPath");
        textpath.setAttribute("href", '#' + innerText.id);
        textpath.appendChild(document.createTextNode(innerText.text));
        text.appendChild(textpath);
        elements.push(text);
    }

    return elements;
}

function rotate (angularVelocity) {
    const wheel = document.querySelector('.wheel');
    let rotation = wheel.getAttribute('data-rotation') || 0;
    rotation = parseFloat(rotation) + Math.max(Math.min(angularVelocity, 0.1), -0.1);
    wheel.setAttribute('data-rotation', rotation);
    wheel.style.transform = "translateX(-50%) translateY(-50%) rotate(" + rotation + "rad)";
}

function setTheme(theme) {
    if (window.localStorage) {
        window.localStorage.setItem('theme', theme);
    }
    document.documentElement.setAttribute('theme', theme);
    document.querySelector('#theme-options .btn--border-active').classList.remove('btn--border-active');
    document.querySelector('#theme-options [value="' + theme + '"]').classList.add('btn--border-active');
}

function setMode(enableDark) {
    const mode = enableDark ? 'dark' : 'light';
    if (window.localStorage) {
        window.localStorage.setItem('mode', mode);
    }
    document.documentElement.setAttribute('mode', mode);
    document.querySelector('#mode-input').setAttribute('value', enableDark);
}

window.addEventListener('load', () => {
    const diameter = 200;

    const wheel = document.querySelector('.wheel');
    const leafs = wheel.querySelectorAll('.wheel__leaf')

    const leafCount = leafs.length;
    const centerX = wheel.clientWidth / 2;
    const centerY = wheel.clientHeight / 2;
    let i = 0;
    for (const leaf of leafs) {
        const angle = 2 * Math.PI / leafCount * i
        leaf.style.left = centerX + diameter * Math.cos(angle) + "px";
        leaf.style.top = centerY + diameter * Math.sin(angle) + "px";
        leaf.style.transform = "rotate(" + angle + "rad) translateY(-50%)"
        leaf.classList.remove('wheel__leaf--disabled')
        i++;
    }

    const innerContainer = wheel.querySelector('.wheel__inner__container')
    const innerElements = createInnerCircle()
    for (const element of innerElements) {
        innerContainer.appendChild(element);
    }

    if (window.localStorage) {
        const theme = this.localStorage.getItem('theme') || 'default';
        const mode = this.localStorage.getItem('mode') || 'dark';
        setTheme(theme);
        setMode(mode === 'dark');
    }
})

document.addEventListener('wheel', (e) => {
    rotate(e.deltaY * 0.01);
});

const touchDetector = new SingleTouchDetector();
touchDetector.connect((delta) => {
    rotate(delta.y * -0.003);
})