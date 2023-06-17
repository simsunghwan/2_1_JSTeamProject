export default class Events {
  constructor() {
    document.title = 'Events';
  }

  eventFunction() {}

  async getHtml() {
    const resEvent = await fetch("/event");
    const dataEvent = await resEvent.json(); 

    const resCatecory = await fetch("/category");
    const dataCategory = await resCatecory.json(); 

    const categoryRows = dataCategory.map(category => {
      return `
          <li class="list-group-item"><a data-render="products_ordered" data-index="${category.slug}" data-link>${category.title}</a></li>
      `;
    }).join("");

    const eventRows = dataEvent.map(event => {
      return `
      <div>
        <a class="" data-link>
          <img class="" src="${event.image}" data-render="" data-index="" style="width: 100%; height: 180px; background-color: rgba(255, 255, 128, .5); border: 3px solid black;" data-link>
        </a>
      </div>
      `
    })
    return `
    <div class='container'>
    <div class="row">
      <div class="col-xs-12 col-md-3">
        <h3>상품 카테고리</h3>
        <ul class="list-group">
          <li class="list-group-item"><a data-render="products" data-index="" data-link>All products</a></li>
            ${categoryRows}
        </ul>
      </div>
      <div class="col-xs-12 col-md-1"></div>
      <div class="col-xs-12 col-md-8">
      <h1>6월의 이벤트 혜택!</h1>
        <br>
        ${eventRows}
        <br>
      </div>
      </div>
      </div>
    `
  }
}