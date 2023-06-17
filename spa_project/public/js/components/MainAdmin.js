  import AdminHome from '../views/admin/AdminHome.js';
  import Products from '../views/Products.js';
  import ProductsOrdered from '../views/ProductsOrdered.js';
  import ProductDetail from '../views/ProductDetail.js';
  import AdminCategories from '../views/admin/AdminCategories.js';
  import AddCategory from '../views/admin/AddCategory.js';
  import EditCategory from '../views/admin/EditCategory.js';
  import AdminProducts from '../views/admin/AdminProducts.js';
  import AddProduct from '../views/admin/AddProduct.js';
  import EditProduct from '../views/admin/EditProduct.js';


  class MainAdmin extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      console.log('connectedCallback');
    }

    disconnectedCallback() {
      console.log('disconnectedCallback');
    }

    static get observedAttributes() {
      console.log('observedAttributes');
      return ['data-render', 'data-index'];
    }

    attributeChangedCallback(attrName, prevValue, curValue) {
      console.log('attributeChangedCallback');
      console.log(`속성명: ${attrName}, 이전 속성값: ${prevValue}, 현재 속성값: ${curValue}`);
      if (attrName === 'data-render' || attrName === 'data-index') {
        this.render();
      } 
    }

    async render() {
      console.log('rendering...');

      let view = null;

      const render = this.dataset.render;

      console.log("view: ", view);

      switch (render) {
        case 'admin_home':
          view = new AdminHome();
          break;

        case 'products':
          view = new Products();
          break;

        case 'products_ordered':
          view = new ProductsOrdered();
          break;    

        case 'product_detail':
          view = new ProductDetail();
          break;    

        case 'admin_categories':
          view = new AdminCategories();
          break;

        case 'add_category':
          view = new AddCategory();
          break;

        case 'edit_category':
          view = new EditCategory();
          break;

        case 'admin_products':
          view = new AdminProducts();
          break;

        case 'add_product':
          view = new AddProduct();
          break;

        case 'edit_product':
          view = new EditProduct();
          break; 
      }

      console.log("view: ", view);
      
      // 지금은 로그인 여부에 관계없이 뷰를 렌더링하는 중.
      
      // if (view) {
      //   let isLoggedIn = false;
        
      //   if ()


      // }

      this.innerHTML = await view.getHtml();
      view.eventFunction();
    }
  }

  customElements.define('main-admin-element', MainAdmin);