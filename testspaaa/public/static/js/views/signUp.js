import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("signUp");
  }
  async pageFunction() {
    return;
}
  async getHtml() {
    return ``
  }

}