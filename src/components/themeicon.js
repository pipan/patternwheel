export class ThemeIcon extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <svg width="20px" height="20px">
            <circle cx="16" cy="16" r="4"></circle>
            <circle cx="4" cy="16" r="4"></circle>
            <circle cx="10" cy="6" r="4"></circle>
        </svg>
        `;
        const classes = this.getAttribute('classes').split(",")
        const circles = this.querySelectorAll('svg circle');
        circles[0].setAttribute('class', classes[0]);
        circles[1].setAttribute('class', classes[1]);
        circles[2].setAttribute('class', classes[2]);
    }
}