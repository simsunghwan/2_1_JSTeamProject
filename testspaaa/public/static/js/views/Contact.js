import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Contact");
    }

    async pageFunction() {
        return;
    }

    async getHtml() {
        return `
            <h1>Contact</h1>
            <p>Manage your privacy and configuration.</p>
        `;
    }
}