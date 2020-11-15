export function createArc(fromDeg, toDeg, radius) {
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

export function createInnerCircle() {
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