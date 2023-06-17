export default class EditBoardContent{
    constructor() {
      document.title = 'EditBoardContent';
      if (document.querySelector('main-element')) {
        this.index = document.querySelector('main-element').dataset.index;
      }
      else if (document.querySelector('main-admin-element')) {
        this.index = document.querySelector('main-admin-element').dataset.index;
      }
    }

    eventFunction() {
      this.editBoard();
      }

    async getHtml() {
      const response = await fetch("/board");
      const data = await response.json();

      console.log(data);
      const boardId = this.index;

      let title = "";
      let content = "";
      let writer = "";
      
      data.forEach( board=> {
        if (board.id === parseInt(boardId)) {
            title = board.title;
            writer = board.writer;
            content = board.content;
        }
      });

      console.log(title);
      console.log(writer);
      console.log(content);

        return `
        <h2 class="page-title">게시글 수정</h2>
        <a data-render="boardView" class="btn btn-primary" data-link>뒤로가기</a>
  
        <br><br><br>
  
        <form id="edit-boardContent-form" method="post">
          <div class="form-group">
            <label for="">제목</label>
            <input type="text" class="form-control" name="title" value= "${title}" placeholder="Title">
          </div>
  
          <div class="form-group">
            <label for="">작성자</label>
            <input type="text" class="form-control" name="writer" value= "${writer}" readonly>
          </div>
  
          <div class="form-group">
            <label for="">내용</label>
            <textarea name="content" class="form-control" cols="30" rows="10" placeholder="Content">${content}</textarea>
          </div>
  
          <button data-render="boardView" data-index="" class="btn btn-default" data-link>Submit</button>
        </form>
            `;
    }

    // 월과 일이 10 보다 작다면 0을 앞에 붙여서 출력
    leftPad(value) {
      if(value >= 10){
        return value;
      }

      return `0${value}`;
    }

    // 게시판 작성 일자의 기본포맷을 yyyy.mm.dd 로 지정
    toStringByFormatting(source){
      const year = source.getFullYear();
      const month = this.leftPad(source.getMonth() + 1);
      const day = this.leftPad(source.getDate());
      const formattedDate = `${year}.${month}.${day}`;

      return formattedDate;
    }

    async editBoard() {
        const boardId = this.index;
        const form = document.getElementById('edit-boardContent-form');
        form.addEventListener('submit', async (e) => {
          e.preventDefault(); // 기본 제출 동작 방지

          const formData = new FormData(form);
    
          console.log(JSON.stringify({
            title: formData.get('title'),
            writer: formData.get('writer'),
            content: formData.get('content'),
            createdAt: this.toStringByFormatting(new Date),
          }));
         
            const response = await fetch('/board/' + boardId, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify( {
                title: formData.get('title'),
                writer: formData.get('writer'),
                content: formData.get('content'),
                createdAt: this.toStringByFormatting(new Date),
              })
            });
    
            if (response.ok) {
              console.log('데이터 전송 성공');
    
            } else {
              console.error('데이터 전송 실패');
            }
        });
      }
}
