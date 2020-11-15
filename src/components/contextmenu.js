export class ContextMenu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const slot = this.children[0].content.cloneNode(true);
        this.innerHTML = `
        <div class="contextmenu">
            <button type="button" class="btn btn--circle">
                <more-vertical class="svg-fg"></more-vertical>
            </button>
            <div class="contextmenu__body" style="display: none;">
                <div style="display: flex; flex-direction: row-reverse">
                    <button type="button" class="contextmenu__close btn btn--circle">
                        <more-vertical class="svg-fg"></more-vertical>
                    </button>
                </div>
            </div>
        </div>
        `;
        this.querySelector('.contextmenu__body').appendChild(slot);
        const buttons = this.querySelectorAll('button');
        buttons[0].addEventListener('click', this.open.bind(this))
        buttons[1].addEventListener('click', this.close.bind(this))
    }

    open() {
        this.querySelector('.contextmenu__body').style.display = "";
    }

    close() {
        this.querySelector('.contextmenu__body').style.display = "none";
    }
}