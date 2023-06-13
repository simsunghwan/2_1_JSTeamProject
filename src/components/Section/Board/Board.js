import { getPosts } from '../../../api/board_view.js';


class Board extends HTMLElement {
  constructor() {
    super();



    this.innerHTML = 
    `
    <div id="board" class="hide">
    <div class="sectionTitle"><h1>자유게시판</h1></div>
    <div class="board_list">
      <div class="board_top">
        <div class="num">번호</div>
        <div class="title">제목</div>
        <div class="writer">글쓴이</div>
        <div class="date">작성일</div>
        <div class="count">조회</div>
      </div>
      <div id="conText">
        <div id="vContent"></div> <!-- input tag로 만들어 보자 -->
      </div>
    </div>
  </div>
</section>  
<footer>
  <div id="board_btn" class="hide">
    <button id="create_board" class="hide">작성</button>
    <!-- 삭제와 수정은 로그인 회원과 일치 할 때만 보이기
    <button id="modify_board" class="show">수정</button>
    <button id="delete_board" class="show">삭제</button>  -->
  </div>

    `
    

    this.loadDatas();
  }

  async loadDatas() {
      this.data = await getPosts();
      this.render();
  }

  async render() {
    console.log(this.data);
    let boardData = Array.from(this.data);
    boardData.sort((a, b) => b.id - a.id);
    console.log(boardData);
    const $boardList  = document.querySelector(".board_list");
    const $boardTop   = document.querySelector(".board_top");

    $boardList.innerHTML = '';
    $boardList.appendChild($boardTop);

    boardData.forEach((v, i) => {
      const $divRow = document.createElement('div');

      const $divNum = document.createElement('div');
      $divNum.className = 'num';
      $divNum.textContent = boardData.length - i;

      const $divTitle = document.createElement('div');
      $divTitle.className = 'title';
      $divTitle.id = `${v.id}`;
      $divTitle.innerHTML = `<a href="" class="boardTitle">${v.title}</a>`;

      const $divWriter = document.createElement('div');
      $divWriter.className = 'writer';
      $divWriter.textContent = `${v.writer}`;

      const $divDate = document.createElement('div');
      $divDate.className = 'date';
      $divDate.textContent = `${v.createdAt}`;

      const $divCount = document.createElement('div');
      $divCount.className = 'count';
      $divCount.innerText = `${v.hit}`;

      $divRow.append($divNum, $divTitle, $divWriter, $divDate, $divCount);
      $boardList.appendChild($divRow);
    });

    const $clickTitles = document.querySelectorAll('.title');
    $clickTitles.forEach(function(title){
      title.addEventListener('click', function(e){
        if(e.target.classList.contains('boardTitle')){
          e.preventDefault();
          console.log(e.target.parentNode.id);
          viewContent(e);
        }
      });
    });

    /* 버튼 div */
    const $divButton = document.createElement('div');
    $divButton.className = "board_button";

    /* create_button */
    const $btnCreateBoard = document.createElement('button');
    $btnCreateBoard.id = "create_board";
    $btnCreateBoard.textContent = "작성";

    /*  버튼 div에 버튼 추가 */
    $divButton.append($btnCreateBoard);
  }

}
  


window.customElements.define('section-board-component', Board);