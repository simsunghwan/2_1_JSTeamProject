// import AbstractView from "./AbstractView.js";

export default class BoardContent{
  constructor() {
    document.title = "BoardContent";
    if (document.querySelector('main-element')) {
      this.index = document.querySelector('main-element').dataset.index;
    }
    else if (document.querySelector('main-admin-element')) {
      this.index = document.querySelector('main-admin-element').dataset.index;
    }
  }

  eventFunction() {
    this.addComment();
    this.deleteComments();
  }

  async increaseHit() {
    let response = await fetch("/board");
    let data = await response.json();
    const boardId = this.index;

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
    let response = await fetch("/board");
    let data = await response.json();
    const boardId = this.index;

    let id = "";
    let title = "";
    let content = "";
    let writer = "";
    let createdAt = "";
    let hit = "";
    let boardCount = 0;

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

    response = await fetch("/comments");
    data = await response.json();
    const commentId = this.index;
    data.forEach(comment => {
      if(parseInt(comment.postId) === parseInt(commentId)) {
        boardCount++;
      }
    })
    

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
        <div id="comment-count">댓글 <span id="count">${boardCount}</span></div>
        <input name="board_id" class="hide" value="${id}">
        <input name="comment-input" value="" placeholder="댓글을 입력해 주세요.">
        <button data-render="boardContent" data-index="${this.index}"class="btn btn-default">등록</button> 
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
    
    let view = '';
    if(commentRows === null){
      view =  `
        <h2 class="board-title">자유게시판</h2>
        <a data-render="boardView" data-index="" class="btn btn-primary" data-link>뒤로가기</a>
        <tBody>
          ${tableRows}
          <h2>아직 댓글이 없습니다.</h2>
        </tBody>
      `;
    } else {
      view = `
      <h2 class="board-title">자유게시판</h2>
      <a data-render="boardView" data-index="" class="btn btn-primary" data-link>뒤로가기</a>
      <tBody>
        ${tableRows}
        ${commentRows}
      </tBody>
      `;
    }

    return view;
  }

  //타임스탬프 만들기
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
        userId: "daehan",
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
          userId: "daehan", /* 유저 이름 받아야함 */
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
    console.log("getBoardComment");
    let response = await fetch("/comments");
    let data = await response.json();
    const boardId = this.index;
  
    let commentExist = false;

    // 해당 게시글의 Id와 댓글의 postId가 같으면 댓글을 들고옴
    const filteredComments = data.filter(item => item.postId.includes(boardId));
    
    // console.log(filteredComments);
    // console.log(filteredComments[0].content);
    data.forEach(comment => {
      if(parseInt(comment.postId) === parseInt(boardId)) {
        commentExist = true;
      }
    })

    const rootDiv = document.createElement('div');
    rootDiv.id = "comments"

    filteredComments.forEach(comment => {
      const userName = document.createElement('div');
      userName.className="name";
      //유저네임가져오기 
      userName.innerHTML = comment.userId;  

      const inputValue = document.createElement('span');
      inputValue.className="inputValue";
      inputValue.innerText = comment.content;
      
      //타임스템프찍기
      const showTime = document.createElement('div');
      showTime.className="time";
      showTime.innerHTML = comment.postTime;  

      // 스코프 밖으로 나가는 순간 하나지우면 다 지워지고 입력하면 리스트 불러옴
      const commentList = document.createElement('div');  
      commentList.className = "eachComment";

      //수정버튼 만들기
      const modifyBtn = document.createElement('a');
      modifyBtn.setAttribute('data-render', 'editComment')
      // modifyBtn.href = `/board/edit-comment/${comment.id}`;
      modifyBtn.className = 'modifyBtn';
      const hiddenValue = comment.id; 
      modifyBtn.setAttribute('data-index', hiddenValue);
      modifyBtn.innerHTML = "수정";
      // modifyBtn.setAttribute('data-value', hiddenValue);
      // modifyBtn.setAttribute('type','button');
      modifyBtn.setAttribute('data-link','');

      
      //스페이서만들기
      const spacer = document.createElement('div');
      spacer.className = "spacer";

      //삭제버튼 만들기
      const delBtn = document.createElement('a');
      delBtn.setAttribute('data-render', 'boardContent');
      delBtn.setAttribute('data-index', `${comment.postId}`);
      // delBtn.href = `/board/${comment.postId}`;
      delBtn.className ="deleteComment";
      delBtn.textContent="삭제";
      delBtn.setAttribute('data-value', hiddenValue);
      delBtn.setAttribute('data-link','');

      userName.appendChild(spacer);
      userName.appendChild(modifyBtn);
      userName.appendChild(delBtn); 

      commentList.appendChild(userName);
      commentList.appendChild(inputValue);
      commentList.appendChild(showTime);

      rootDiv.prepend(commentList);

      // console.log(modifyBtn)
      
    });

    if (commentExist){
      return rootDiv.innerHTML;
    } else {
      return null;
    }   
  }

  deleteComments() {
    console.log("삭제 시작");
    const $deleteCommentBtn = document.querySelectorAll('.deleteComment');
    $deleteCommentBtn.forEach(element => {
      element.addEventListener("click",async(e) => {
      e.preventDefault();
      const checkDelete = confirm("삭제하시겠습니까?");
      const comment_id = element.getAttribute('data-value');
      if(checkDelete) {
        const response = await fetch('/comments/' + comment_id, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        // 응답 처리
        if (response.ok) {
          console.log('Data submitted successfully');
        } else {
          console.error('Error submitting data');
        }
      }
    })
   })
 };
}