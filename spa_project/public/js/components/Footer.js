class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    //
  }

  render() {
    this.innerHTML = `
      <br><br><br>
      <hr>    
      <p class="text-center">&COPY; 6조 자바스크립트</p>
    `
  }

}

customElements.define('footer-element', Footer);