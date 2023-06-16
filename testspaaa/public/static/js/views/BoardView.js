import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
      super(params);
      this.setTitle("Board");
  }

  async getHtml() {
      const response = await fetch("/board");
      const data = await response.json(); 
      let tableRows = '';
      let boardCount = 0;

      if (data.length === 0) {
        return `
        <h2 class="board-title">자유게시판</h2>
        <a href="/board/add-board" class="btn btn-primary" id="btn" data-link>게시글 작성</a>
        <br><br><br>
        <h3 class="text-center">아직 게시글이 없습니다.</h3>`
      }
      else {
        tableRows = data.map(boardData => {
          if (boardData.image === "") {
            boardCount++;
              return `
                <tr>
                <td>${boardCount}</td>
                <td><a href=/board/${boardData.id} data-link>${boardData.title}</a></td>
                <td>${boardData.writer}</td>
                <td>${boardData.createdAt}</td>
                <td>${boardData.hit}</td>
                <td><a href="/edit-board/${boardData.id}" data-link>게시글 수정</a></td>
                <td><a class="confirmDeletion" href="/board/delete-board/${boardData.id}" data-link>게시글 삭제</a></td>
                </tr>
              `;
          } else {
            boardCount++;
            return `
                <tr>
                    <td>${boardCount}</td>
                    <td><a href=/board/${boardData.id} data-link>${boardData.title}</a></td>
                    <td>${boardData.writer}</td>
                    <td>${boardData.createdAt}</td>
                    <td>${boardData.hit}</td>
                    <td><a href="/edit-board/${boardData.id}" data-link>게시글 수정</a></td>
                    <td><a class="confirmDeletion" href="/board/delete-board/${boardData.id}" data-link>게시글 삭제</a></td>
                </tr>
            `;
          }
      }).join("");
  }


      return `
          <h2 class="board-title">자유게시판</h2>
          <a href="/board/add-board" class="btn btn-primary" id="btn" data-link>게시글 작성</a>
          
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

  async pageFunction() {
      this.deleteBoard();
  }


  deleteBoard() {
    const $confirmDeletion = document.querySelectorAll('.confirmDeletion');
    $confirmDeletion.forEach(element => {
          element.addEventListener("click", async (e) => {
          const checkDelete = confirm("삭제하시겠습니까?");
          if (checkDelete) {
              const boardId = e.target.href.replace("http://localhost:3000/board/delete-board/", "");
              const response = await fetch('/board/' + boardId, {
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
                  console.log('Data submitted successfully');
        
                } else {
                  console.error('Error submitting data');
                }
          }
      });
    });
  }
}
