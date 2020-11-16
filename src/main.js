require('./style/css.css');
require('./style/default-theme.css');
require('./style/cold-theme.css');
require('./style/warm-theme.css');
require('./style/grayscale-theme.css');
require('./style/ludka-theme.css');
require('./style/orprgr-theme.css');

import { SingleTouchDetector } from './scripts/singletouchdetector';
import { createInnerCircle } from './scripts/svg';
import { setMode, setTheme, rotate } from './scripts/actions';

import { ContextMenu } from './components/contextmenu';
import { MoreVertical } from './components/morevertical';
import { SwitchToggle } from './components/switchtoggle';
import { ThemeIcon } from './components/themeicon';

window.customElements.define('context-menu', ContextMenu);
window.customElements.define('more-vertical', MoreVertical);
window.customElements.define('switch-toggle', SwitchToggle);
window.customElements.define('theme-icon', ThemeIcon);

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
        const theme = window.localStorage.getItem('theme') || 'default';
        const mode = window.localStorage.getItem('mode') || 'dark';
        setTheme(theme);
        setMode(mode === 'dark');
    }
})

document.addEventListener('wheel', (e) => {
    rotate(e.deltaY * 0.01);
});

const touchDetector = new SingleTouchDetector();
touchDetector.connect((delta) => {
    rotate(delta.y * -0.006);
});

window.setTheme = setTheme;
window.setMode = setMode;