export class SwitchToggle extends HTMLElement {
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
        const labelledby = this.getAttribute('labelledby');
        this.innerHTML = `
        <div class="switch" tabindex="0" role="checkbox"></div>
        `;
        const switchElement = this.querySelector('.switch');
        switchElement.setAttribute('aria-labelledby', labelledby);
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
        switchElement.setAttribute('aria-checked', value);
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: value
            }
        }))
    }
}