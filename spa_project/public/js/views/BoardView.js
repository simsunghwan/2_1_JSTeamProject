export default class BoardView{
  constructor() {
      document.title = 'BoardView';
  }

  eventFunction() {
    this.deleteBoard();
  }

  async getHtml() {
      let userId = localStorage.getItem("userID");
      let userName = localStorage.getItem("username");
      let userType = localStorage.getItem("userType");

      let response = await fetch("/board");
      let data = await response.json();
      let tableRows = '';
      let boardCount = 0;
      if (data.length === 0) {
        return `
        <h2 class="board-title">자유게시판</h2>
        <a data-render="addBoard" class="btn btn-primary" id="btn" data-link>게시글 작성</a>
        <br><br><br>
        <h3 class="text-center">아직 게시글이 없습니다.</h3>`
      }
      else {
        tableRows = data.map(boardData => {
          let btnId = 'hide';
          if(userType != "admin"){
            if(boardData.writer == userName){
              btnId = 'show';
            } 
          } else {
            btnId = 'show';
          }
          boardCount++;
            return `
              <tr>
              <td>${boardCount}</td>
              <td><a data-render="boardContent" data-index="${boardData.id}" data-link>${boardData.title}</a></td>
              <td class="writer">${boardData.writer}</td>
              <td>${boardData.createdAt}</td>
              <td>${boardData.hit}</td>
              <td><a class="viewBoard" id="${btnId}" data-render="editBoardContent" data-index="${boardData.id}" data-link>게시판 수정</a></td>
              <td><a class="confirmDeletion" id="${btnId}" data-render="boardView" data-index="${boardData.id}" data-link>게시글 삭제</a></td>
              </tr>
            `;
      }).join("");
      // response = await fetch("/user");
      // data = await response.json();


      // 게시글 주인 체크 => 보임 숨김 처리
      // const boardShowHide = document.querySelectorAll(".viewBoard");
      // console.log(boardShowHide);
      // if(userType != "admin"){
      //   console.log(userType);
      //   data.forEach(board => {
      //     if(board.writer == userName){
      //       boardShowHide.forEach( v => {
      //         // console.log("v.id : "+v.id);
      //         // console.log("v.index : "+v.getAttribute('data-index'));
      //         if(v.getAttribute('data-index') == board.id){
      //           console.log("v.id : "+v.id);
      //           v.id = 'show';
      //         }
      //       })
      //     }
      //   })
      // } else {
      //   data.forEach(board => {
      //     boardShowHide.forEach(v =>{
      //       console.log("v.id : "+v.id);
      //       v.id = 'show';
      //     })
      //   })
      // }
  }


      return `
          <h2 class="board-title">자유게시판</h2>
          <a data-render="addBoard" class="btn btn-primary" id="btn" data-link>게시글 작성</a>
          
          <br><br><br>

          <table class="table table-striped">
              <thead>
                  <tr>
                      <th>번호</th>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>작성일</th>
                      <th>조회</th>
                      <th>게시글 수정</th>
                      <th>게시글 삭제</th>
                  </tr>
              </thead>
              <tbody>
                  ${tableRows}
              </tbody>
          </table>
          `;
  }

  async deleteBoard() {
    const $confirmDeletion = document.querySelectorAll('.confirmDeletion');
    // let BoardNum = '';
    
    // .dataset.index;
    

    $confirmDeletion.forEach(element => {
          element.addEventListener("click", async (e) => {
          const checkDelete = confirm("삭제하시겠습니까?");
          if (checkDelete) {
              const boardId = e.target.dataset.index;
              let response = await fetch('/board/' + boardId, {
              method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                   },
                  // body: JSON.stringify( {
                  //   title: formData.get('title'),
                  //   slug: formData.get('slug'),
                  //   content: formData.get('content')
                  // })
                });
              // 응답 처리
              if (response.ok) {
                console.log('게시글 삭제 완료');
      
              } else {
                console.error('게시글 삭제 실패');
              }
                
              response = await fetch('/comments/');
              let data = await response.json();
              const filteredComments = data.filter(item => item.postId.includes(boardId));
              filteredComments.forEach(async comment => {
                if(parseInt(comment.postId) === parseInt(boardId)){
                  response = await fetch('/comments/' + comment.id, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                }
              }) 
                // 응답 처리
                if (response.ok) {
                  console.log('댓글 삭제 성공');
        
                } else {
                  console.error('댓글 삭제 실패');
                }
          }
      });
    });
  }
}
