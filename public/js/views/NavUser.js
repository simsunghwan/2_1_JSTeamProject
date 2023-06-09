export default class NavUser {
  constructor() {

  }

  getHtml() {
    let navTemplete;

    const loginUser = localStorage.getItem('userID');
    const loginUsername = localStorage.getItem('username');

    // if(loginUser) { }
      const whoLoggedIn = localStorage.getItem('userType');
      console.log(whoLoggedIn);

      if(whoLoggedIn === 'admin') {
        // 어드민
        navTemplete = `
        <li><a class="nav__link" id="btn-logout" data-render="home" data-index="" data-log="" data-link>Hi! ${loginUsername} (로그아웃)</a></li>
        <li><a class="nav__link" href="/admin" data-render="" data-index="" data-linq>Go to Admin Area</a></li>
        <li><a class="nav__link" id="btn-deleteAdmin" data-render="deleteAdmin" data-index="" data-link>회원강퇴</a></li>
        <li><a class="nav__link" id="btn-CorrectionUser" data-render="correctionUser" data-index="" data-log="" data-link>회원수정</a></li>
        `
      }
      else {
        // 일반 유저
        navTemplete = `
        <li><a class="nav__link" data-render="cart" data-index="" data-link>My Cart(숫자 구현 필요)</a></li>
        <li><a class="nav__link" id="btn-logout" data-render="home" data-index="" data-log="" data-link>Hi! ${loginUsername} (로그아웃)</a></li>
        <li><a class="nav__link" id="btn-deleteUser" data-render="home" data-index="" data-log="" data-link>회원탈퇴</a></li>
        <li><a class="nav__link" id="btn-CorrectionUser" data-render="correctionUser" data-index="" data-log="" data-link>회원수정</a></li>
        `
      }

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
              <li><a class="nav__link" data-render="team"  data-index="" data-link>조원 소개</a></li>
            
              </ul>
            <ul class="nav navbar-nav navbar-right">
              ${navTemplete}
          </ul>
          </div>
        </div>
      </nav>
    `;
  }

  eventFunction() {
    this.logout();
    this.deleteUser();
  }




  deleteUser() {
    const userID = localStorage.getItem("userID");
    const userType = localStorage.getItem("userType");
    if (userType) {
      const deleteUserBtn = document.getElementById('btn-deleteUser');
      deleteUserBtn.addEventListener('click', async e => {
        const checkDelete = confirm('탈퇴 하시겠습니까?');
        if (checkDelete) {
          
          localStorage.clear();
          
          const response = await fetch("/user");
          const data = await response.json();

          const user = data.find((user) => user.userid === userID);
          await fetch(`/user/${user.id}`, {
            method: "DELETE",
          });


          alert("탈퇴 되었습니다.");
        }
      });
    }
    
  }


  logout() {
    const logoutBtn = document.getElementById('btn-logout');
    logoutBtn.addEventListener('click', e => {
      const checkLogout = confirm('로그아웃 하시겠습니까?');
      if (checkLogout) {
        localStorage.clear();
      }
    });
  }
}
