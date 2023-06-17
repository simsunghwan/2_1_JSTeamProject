export default class NavGuest {
  constructor() {

  }

  getHtml() {
    return `
      <nav class="navbar navbar-inverse">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand nav__link" data-render="home" data-index="">SPA ecommerce</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><a class="nav__link" data-render="products" data-index="" data-link>상품</a></li>
              <li><a class="nav__link" data-render="events" data-index="" data-link>진행 중인 이벤트</a></li>
              <li><a class="nav__link" data-render="boardView" data-index="" data-link>게시판</a></li>
              <li><a class="nav__link" data-render="team" data-index="" data-link>조원 소개</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a class="nav__link" data-render="cart" data-index="" data-link>My Cart(숫자 구현 필요)</a></li>
              <li><a class="nav__link" data-render="register" data-index="" data-link>회원가입</a></li>
              <li><a class="nav__link" data-render="login" data-index="" data-link>로그인</a></li>
          </ul>
          </div>
        </div>
      </nav>
    `;

  }

  eventFunction() {}

}
