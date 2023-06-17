class Header extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = 
    `
    <div class="main_top" style="display: flex !important;">
      <a href="/" id="home_title"><h1>Home</h1></a> 
      <nav>
        <a data-link href="/vIntro" class="nav_bar"><h1>조원 소개</h1></a>
        <a href="/vNihon" class="nav_bar"><h1>현지학기제</h1></a>
        <a data-link href="/vBoard" class="nav_bar"><h1>게시판</h1></a>
        <a href="/404" class="nav_bar"><h1>준비중....</h1></a>
      </nav>
    </div>
    `
  }
}

window.customElements.define('header-component', Header);