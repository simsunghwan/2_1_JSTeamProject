  export default class {
    constructor() {
      document.title = 'ProductDetail';
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

      const self = this;

      const cartItems = 0;

      const categoryRows = dataCategory.map(category => {
        return `
        <li class="list-group-item"><a data-render="products_ordered" data-index="${category.slug}" data-link>${category.title}</a></li>
        `;
      }).join("");

      const product = dataProduct.find(product => {
        if (product.slug === self.index) {
          return true;
        }
      });

      if (!product) {
        return ;
      } 

      console.log(product);
      
      return `

      <div class="container">
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

          <div class="row">

          <h1 class="page-header">${product.title}</h1>

          <div class="col-xs-12 col-md-5">
            <img class="spi" src="${product.image}" alt="">
            <br>
          </div>  
          <div class="col-xs-12 col-md-7">
            <br>
            <p>${product.desc}</p>
            <br>
            <p>${product.price}원</p>
            <br>  
            <p><a href="/cart/add/${product.slug}" data-link>Add to Cart</a></p>
            
          </div>
          
        </div>
        </div>
        </div>
        </div>

        `;
    } 
  }