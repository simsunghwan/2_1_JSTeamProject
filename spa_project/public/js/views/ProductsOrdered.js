export default class {
  constructor() {
    document.title = 'ProductsOrdered';
    this.index = '';
    if (document.querySelector('main-element')) {
      this.index = document.querySelector('main-element').dataset.index;
    }
    else if (document.querySelector('main-admin-element')) {
      this.index = document.querySelector('main-admin-element').dataset.index;
    }

  }

  eventFunction() {
    return;
  }

  async getHtml() {
        const resCatecory = await fetch("/category");
        const dataCategory = await resCatecory.json(); 

        const resProduct = await fetch("/product");
        const dataProduct = await resProduct.json(); 
        
        const pageId = this.index;

        const categoryRows = dataCategory.map(category => {
            return `
            <li class="list-group-item"><a data-render="products_ordered" data-index="${category.slug}" data-link>${category.title}</a></li>
            `;
          }).join("");

          const productRows = dataProduct.map(product => {
            if (product.category === pageId) {
              return `
              <div class="col-xs-12 col-md-4 p">
                <a class="pa" data-link>
                  <img class="pimage" src="${product.image}" data-render="product_detail" data-index="${product.slug}"  data-link>
                </a>
                <h3>${product.title}</h3>
                <h4>${product.price}원</h4> 
                <a class="vd" data-render="product_detail" data-index="${product.slug}" data-link>View Details</a>
              </div>
            `;
            }
          }).join("");

        return `

      <div class="container">
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
              <div class="row products">
                ${productRows}
              </div> 
            </div>
          </div>
        </div>

        `;
    }
}