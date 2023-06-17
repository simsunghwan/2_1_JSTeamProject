class FooterAdmin extends HTMLElement {
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
      <p class="text-center">&COPY; 어드민 계정임</p>
    `
  }

}

customElements.define('footer-admin-element', FooterAdmin);