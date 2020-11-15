class MoreVertical extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <svg width="20px" height="20px">
            <circle cx="10" cy="2" r="2"></circle><circle cx="10" cy="10" r="2"></circle><circle cx="10" cy="18" r="2"></circle>
        </svg>
        `;
        this.querySelector('svg').setAttribute('class', this.getAttribute('class'));
    }
}

window.customElements.define('more-vertical', MoreVertical);