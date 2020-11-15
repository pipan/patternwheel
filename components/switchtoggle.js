class SwitchToggle extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['value'];
    }

    getValue() {
        return (this.getAttribute('value') === 'true');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && oldValue !== newValue) {
            this.set(newValue === 'true');
        }
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="switch" tabindex="0"></div>
        `;
        const switchElement = this.querySelector('.switch');
        switchElement.addEventListener('click', (e) => {
            this.toggle()
        });
        switchElement.addEventListener('keydown', (e) => {
            if (e.code === "Space" || e.code === "Enter") {
                this.toggle();
            }
        });
        switchElement.setAttribute('value', this.getValue());
    }

    toggle() {
        this.set(!this.getValue());
    }

    set(value) {
        const switchElement = this.querySelector('.switch');
        if (!switchElement) {
            return;
        }
        switchElement.setAttribute('value', value);
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: value
            }
        }))
    }
}

window.customElements.define('switch-toggle', SwitchToggle);