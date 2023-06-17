export default class AdminHome {
  constructor() {
    document.title = 'AdminHome';
  }

  eventFunction() {}

  async getHtml() {
    const resCatecory = await fetch("/category");
    const dataCategory = await resCatecory.json(); 

    const categoryRows = dataCategory.map(category => {
      return `
          <li class="list-group-item"><a data-render="products_ordered" data-index="${category.slug}" data-link>${category.title}</a></li>
      `;
    }).join("");

    return `
    <div class='container'>
    <div class="row">
      <div class="col-xs-12 col-md-3">
        <h3>Categories</h3>
        <ul class="list-group">
          <li class="list-group-item"><a data-render="products" data-index="" data-link>All products</a></li>
            ${categoryRows}
        </ul>
      </div>
      <div class="col-xs-12 col-md-1"></div>
      <div class="col-xs-12 col-md-8">
      <h1>Welcome!</h1>
      <h3>어드민 테스트 페이지입니다.</h3>
      <p>
        <br>
        <br>데이터 입력 검증 구현해야 함
        <br>slug 자동 생성 구현해야 함
        <br>base64 인코딩 동기화해야 함
        <br>css 조정해야 함
      </p>
      <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      </div>
      </div>
      </div>
    `
  }
}