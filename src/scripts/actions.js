export function rotate (angularVelocity) {
    const wheel = document.querySelector('.wheel');
    let rotation = wheel.getAttribute('data-rotation') || 0;
    rotation = parseFloat(rotation) + Math.max(Math.min(angularVelocity, 0.1), -0.1);
    wheel.setAttribute('data-rotation', rotation);
    wheel.style.transform = "translateX(-50%) translateY(-50%) rotate(" + rotation + "rad)";
}

export function setTheme(theme) {
    if (window.localStorage) {
        window.localStorage.setItem('theme', theme);
    }
    document.documentElement.setAttribute('theme', theme);
    if (document.querySelector('#theme-options .btn--border-active')) {
        document.querySelector('#theme-options .btn--border-active').classList.remove('btn--border-active');
    }
    if (document.querySelector('#theme-options [value="' + theme + '"]')) {
        document.querySelector('#theme-options [value="' + theme + '"]').classList.add('btn--border-active');
    }
}

export function setMode(enableDark) {
    const mode = enableDark ? 'dark' : 'light';
    if (window.localStorage) {
        window.localStorage.setItem('mode', mode);
    }
    document.documentElement.setAttribute('mode', mode);
    if (document.querySelector('#mode-input')) {
        document.querySelector('#mode-input').setAttribute('value', enableDark);
    }
}