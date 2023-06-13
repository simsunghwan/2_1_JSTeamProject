// test, is working with ESM import
import { getBoard } from './api/posts.js';

// const board_list = await getBoard();
// const view_content = await getBoardContent(4);

// console.log(board_list);
// console.log(view_content);

class Board extends HTMLElement {
  
  constructor() {
    super();

    this.innerHTML = 
    `
    <div id="board">
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
          <div id="vContent"></div> 
        </div>
      </div>
    </div>
    `
  }
}


window.customElements.define('section-board-component', Board);