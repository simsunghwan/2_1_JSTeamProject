class HeaderCombine extends HTMLElement {
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

  render() {
    let loginTemplete = '';

    const loginUser = localStorage.getItem('userID');

    if(loginUser) {
      const whoLoggedIn = localStorage.getItem('userType');
      console.log(whoLoggedIn);
      if(whoLoggedIn === 'admin') {
        // 어드민
        loginTemplete = `
        <li><a class="nav__link" href="/admin" data-render="" data-index="" data-linq>Go to Admin Area</a></li>
        <li><a class="nav__link" data-render="" data-index="" data-link>Hi! ${loginUser}, logout</a></li>
        `
      }

      else {
        // 일반 유저
        loginTemplete = `
        <li><a class="nav__link" data-render="cart" data-index="" data-link>My Cart(숫자 구현 필요)</a></li>
        <li><a class="nav__link" data-render="" data-index="" data-link>Hi! ${loginUser}, logout</a></li>
          `
      }
    }
    else {
      // 게스트
      loginTemplete = `
      <li><a class="nav__link" data-render="cart" data-index="" data-link>My Cart(숫자 구현 필요)</a></li>
      <li><a class="nav__link" data-render="register" data-index="" data-link>Register</a></li>
      <li><a class="nav__link" data-render="login" data-index="" data-link>Login</a></li>
      `
    }



    this.innerHTML = `
      <nav class="navbar navbar-inverse">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand nav__link" data-render="home" data-index="">SPA ecommerce</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><a class="nav__link" data-render="admin_products" data-index="" data-link>Admin Products</a></li>
              <li><a class="nav__link" data-render="admin_categories" data-index="" data-link>Admin Categories</a></li>
              <li><a class="nav__link" data-render="events" data-index="" data-link>Events</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
            ${loginTemplete}
          </ul>
          </div>
        </div>
      </nav>
    `;
  
  }
  

}

customElements.define('header-combine-element', HeaderCombine);