class Header extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = 
    `
    <div class="main_top" style="display: flex !important;"> <!-- display : flex 가 어떤 뜻이야?  -->
      <a href="/" id="home_title"><h1>Home</h1></a> 
      <nav>
        <a href="/vIntro" class="nav_bar"><h1>조원 소개</h1></a>
        <a href="/vNihon" class="nav_bar"><h1>현지학기제</h1></a>
        <a href="/vBoard" class="nav_bar"><h1>게시판</h1></a>
        <a href="" class="nav_bar"><h1>준비중....</h1></a>
      </nav>


      <div id="login" class="show">
        <div class="login_form">
          <div>
            <h4>Login</h4>
            <input onkeyup = "setId()" type="text" name="user_name" id="input_login">
            <input type="password" name="password" id="input_pw">
          </div>
          <div class="btn">
            <button onclick = "login()" id="loginBtn">login</button>
            <button id="signUpBtn">sign Up</button>
          </div>
        </div>
      </div>
    </div>
    `
  }
}

window.customElements.define('header-component', Header);