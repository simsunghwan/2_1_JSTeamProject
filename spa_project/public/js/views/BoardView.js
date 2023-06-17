export default class BoardView{
  constructor() {
      document.title = 'BoardView';
  }

  eventFunction() {
    this.deleteBoard();
  }

  async getHtml() {
      const response = await fetch("/board");
      const data = await response.json(); 
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
          boardCount++;
            return `
              <tr>
              <td>${boardCount}</td>
              <td><a data-render="boardContent" data-index="${boardData.id}" data-link>${boardData.title}</a></td>
              <td>${boardData.writer}</td>
              <td>${boardData.createdAt}</td>
              <td>${boardData.hit}</td>
              <td><a class="viewBoard" data-render="editBoardContent" data-index="${boardData.id}" data-link>게시판 수정</a></td>
              <td><a class="confirmDeletion" data-render="boardView" data-index="${boardData.id}" data-link>게시글 삭제</a></td>
              </tr>
            `;
      }).join("");
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

  deleteBoard() {
    const $confirmDeletion = document.querySelectorAll('.confirmDeletion');
    // let BoardNum = '';
    
    // .dataset.index;
    

    $confirmDeletion.forEach(element => {
          element.addEventListener("click", async (e) => {
          const checkDelete = confirm("삭제하시겠습니까?");
          if (checkDelete) {
              const boardId = e.target.dataset.index;
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
