import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Board/BoardContent");
  }

  async increaseHit() {
    let response = await fetch("/board");
    let data = await response.json();
    const boardId = location.pathname.replace("/board/", "");

    let hit = "";
    
    data.forEach(board => {
      if(board.id === parseInt(boardId)) {
        hit = parseInt(board.hit);
      }
    })

    console.log(hit);
    response = await fetch('/board/' + boardId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hit: hit + 1
      })
    })

    if(response.ok) {
      console.log('데이터 전송 성공');
    } else {
      console.error('데이터 전송 실패')
    }
  }

  async getBoardContent() {
    this.increaseHit();
    const response = await fetch("/board");
    const data = await response.json();
    const boardId = location.pathname.replace("/board/", "");

    let id = "";
    let title = "";
    let content = "";
    let writer = "";
    let createdAt = "";
    let hit = "";
    let image = "";

    data.forEach(board => {
      if(board.id === parseInt(boardId)) {
        id = board.id;
        title = board.title;
        content = board.content;
        writer = board.writer;
        createdAt = board.createdAt;
        image = board.image;
        hit = board.hit + 1;
      }
    })
    
    if (image === "") {
      return `
        <h1 class="title">${title}</h1>
        <article class="content_top">
          <h4 class="writer">작성자</h4>
          <span class="writer">${writer}</span>
          <h4 class="createdAt">작성일자</h4>
          <span class="createdAt">${createdAt}</span>
          <h4 class="hit">조회</h4>
          <span class="hit">${hit}</span>
        </article>
        <article class="content">
          <h3 class="boardContent">내용</h3>
          <p class="boardContent">${content}</p>
        </article>
      `;
    } else {
      return `
      <article class="content_top">
        <h1 class="title">${title}</h1>
        <h4 class="writer">작성자</h4>
        <p class="writer">${writer}</p>
        <h4 class="createdAt">작성일자</h4>
        <p class="createdAt">${createdAt}</p>
        <h4 class="hit">조회</h4>
        <p class="hit">${hit}</p>
      </article>
      <article class="content">
        <h3 class="boardContent">내용</h3>
        <p class="boardContent">${content}</p>
      </article>
      `;
    }
  }

  async getHtml() {
    let tableRows = '';
    tableRows = await this.getBoardContent();
    return `
      <h2 class="board-title">자유게시판</h2>
      <a href="/board" class="btn btn-primary" data-link>뒤로가기</a>
      <tBody>
        ${tableRows}
      </tBody>
    `;
  }
}