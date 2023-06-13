import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Board/BoardContent");
  }

  async pageFunction() {
    this.addComment();
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

    data.forEach(board => {
      if(board.id === parseInt(boardId)) {
        id = board.id;
        title = board.title;
        /* content 줄바꿈 처리 */
        content = board.content.replace(/\n/g, '<br>');
        writer = board.writer;
        createdAt = board.createdAt;
        hit = board.hit + 1;
      }
    })

    // comments 의 개수에 따라 다른 출력?
    
    // if()
    return `
      <h2 class="title">${title}</h2>
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
      <form id="add-comment-form" method="post">
        <div id="comment-count">댓글 <span id="count">0</span></div>
        <input name="board_id" class="hide" value="${id}">
        <input name="comment-input" value="" placeholder="댓글을 입력해 주세요.">
        <button class="btn btn-default">등록</button> 
      </form>
    `;
  }

  async getHtml() {
    let tableRows = '';
    let commentRows = '';
    tableRows = await this.getBoardContent();
    commentRows = await this.getBoardComment();
    console.log(tableRows);
    console.log(commentRows);
    if(commentRows === null){
      return `
        <h2 class="board-title">자유게시판</h2>
        <a href="/board" class="btn btn-primary" data-link>뒤로가기</a>
        <tBody>
          ${tableRows}
          <h2>아직 댓글이 없습니다.</h2>
        </tBody>
      `;
    }
    return `
      <h2 class="board-title">자유게시판</h2>
      <a href="/board" class="btn btn-primary" data-link>뒤로가기</a>
      <tBody>
        ${tableRows}
        ${commentRows}
      </tBody>
    `;
  }

  //타임스템프 만들기
  generateTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const wDate = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const time = year+'-'+month+'-'+wDate+' '+hour+':'+min+':'+sec;
    return time;
  }
  

  // 댓글 추가
  addComment() {
    console.log('addComment 실행');

    const form = document.getElementById('add-comment-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 제출 동작 방지

      const formData = new FormData(form);
      // const board_id = document.querySelector('#board_id');

      console.log(JSON.stringify({
        postId: formData.get('board_id'),
        content: formData.get('comment-input'),
        postTime: this.generateTime()
      }))

      const response = await fetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          postId: formData.get('board_id'),
          content: formData.get('comment-input'),
          postTime: this.generateTime()
        })
      });

    if (response.ok) {
      console.log('데이터 전송 성공');

    } else {
      console.error('데이터 전송 실패');
    }
    })
    console.log('addComment 종료')   
  }

  // 게시글 댓글 가져오기
  async getBoardComment() {
    const response = await fetch("/comments");
    const data = await response.json();
    const boardId = location.pathname.replace("/board/", "");
    
    let userId = "";
    let content = "";
    let postTime = "";
    let commentId = "";
    let commentExist = true;
    data.forEach(comment => {
      if(comment.postId === parseInt(boardId)) {
        userId = comment.userId;
        content = comment.content;
        postTime = comment.postTime;
        commentId = comment.id;
      }else {
        commentExist = false;
      }
    })

    if (commentExist){
      return `
        <div class="name" id="newId">${userId}
          <div class="spacer">${commentId}</div>        
          <button type="button" class="modifyBtn">수정</button>
          <button type="button" class="deleteComment">삭제</button>
        </div>
        <span class="inputValue" id="newId">${content}</span>
        <div class="time">${postTime}</div>
      `
    } else {
      return null;
    }   
  }
}