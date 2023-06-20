import NavGuest from '../views/NavGuest.js';
import NavUser from '../views/NavUser.js';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // 로그아웃 시 구현
  }

  static get observedAttributes() {
    console.log('observedAttributes');
    return ['data-log'];
  }

  attributeChangedCallback(attrName, prevValue, curValue) {
    console.log('attributeChangedCallback');
    console.log(`속성명: ${attrName}, 이전 속성값: ${prevValue}, 현재 속성값: ${curValue}`);
    if (attrName === 'data-log') {
      this.render();
    } 
  }

  async render() {
    let view = null;

    const loginUser = localStorage.getItem('userID');

    if(loginUser) {
      // 유저 또는 어드민
      view = new NavUser();
    }
    else {
      // 게스트
      view = new NavGuest();
    }

    this.innerHTML = await view.getHtml();
    view.eventFunction();
    
  }

}

customElements.define('header-element', Header);