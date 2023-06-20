  import Home from '../views/Home.js';
  import Register from '../views/Register.js';
  import Login from '../views/Login.js';
  import Products from '../views/Products.js';
  import ProductsOrdered from '../views/ProductsOrdered.js';
  import ProductDetail from '../views/ProductDetail.js';
  import Events from '../views/Events.js';
  import BoardView from '../views/BoardView.js';
  import BoardContent from '../views/BoardContent.js';
  import EditBoardContent from '../views/EditBoardContent.js';
  import EditComment from '../views/EditComment.js'
  import AddBoard from '../views/AddBoard.js';
  import Team from '../views/Team.js';
  import DeleteAdmin from '../views/admin/deleteAdmin.js';
  import CorrectionUser from '../views/CorrectionUser.js';
  import EventContent from '../views/eventContent.js'

  class Main extends HTMLElement {
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

    /* 로그인 여부 확인 게시판 용 */
    isLoggedIn() {
      const userId = localStorage.getItem("userID");
      const userName = localStorage.getItem("username");
      return userId !== null && userName !== null;
    }

    attributeChangedCallback(attrName, prevValue, curValue) {
      console.log('attributeChangedCallback');
      console.log(`속성명: ${attrName}, 이전 속성값: ${prevValue}, 현재 속성값: ${curValue}`);
      if (attrName === 'data-render' || attrName === 'data-index') {
        this.render();
      } 
    }

    async render() {
      console.log('main rendering...');

      let view = null;

      const render = this.dataset.render;
      
      console.log("view: ", view);

      switch (render) {
        case 'home':
          view = new Home();
          break;

        case 'register':
          view = new Register();
          break; 

        case 'login':
          view = new Login();
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
          
        case 'events':
          view = new Events();
          break;

        case 'boardView':
          view = new BoardView();
          break;

        case 'boardContent':
          view = new BoardContent();
          break;
        
        case 'addBoard':
          if (this.isLoggedIn()) {
            view = new AddBoard();
          } else {
            alert("로그인 후 이용해주세요.");
            this.setAttribute('data-render', 'boardView');
            return;
          }
          break;
        
        case 'editBoardContent':
          view = new EditBoardContent();
          break;

        case 'editComment':
          view = new EditComment();
          break;

        case 'team':
          view = new Team();
          break;
          
        case 'deleteAdmin':
          view = new DeleteAdmin();
          break;

        case 'eventContent':
          view = new EventContent();
          break;

        case 'correctionUser':
          view = new CorrectionUser(); 
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

  customElements.define('main-element', Main);