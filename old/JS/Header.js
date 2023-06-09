import './login.js'

class Header extends HTMLElement {
  constructor() { 
    super();

    this.currentOffset = 0;

    this.innerHTML =
    `
    <header>
        {/* <!-- Head --> */}
        <div class="main_top" style="display: flex !important;"> 
          <div id="home_title" onclick="defaultDisplay()"><h1>Home</h1></div> 
          <nav>
            <div class="nav_bar" onclick="vIntro()"><h1>조원 소개</h1></div>
            <div class="nav_bar"><h1>현지학기제</h1></div>
            <div class="nav_bar" onclick="getPosts()"><h1>게시판</h1></div>
            <div class="nav_bar"><h1>준비중....</h1></div>
          </nav>

  
          </div>
        </div>
      </header>
    `
  }





}

window.customElements.define('header-component', Header);