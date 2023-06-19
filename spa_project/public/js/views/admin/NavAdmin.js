export default class NavAdmin {
  constructor() {

  }

  getHtml() {
    const loginUser = localStorage.getItem('userID');

    return `
      <nav class="navbar navbar-inverse">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand nav__link" data-render="admin_home" data-index="">SPA ecommerce</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
            <li><a class="nav__link" data-render="admin_categories" data-index="" data-link>카테고리 목록 확인</a></li>
              <li><a class="nav__link" data-render="admin_products" data-index="" data-link>상품 목록 확인</a></li>
              <li><a class="nav__link" data-render="admin_team" data-index="" data-link>조원 목록 확인</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a class="nav__link" href="/" data-render="" data-index="" data-linq>Back to User Area</a></li>
            </ul>
          </div>
        </div>
      </nav>
    `;

  }
  
  eventFunction() {
    return;
  }


}
