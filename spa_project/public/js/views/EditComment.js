// import AbstractView from "./AbstractView.js";

export default class EditComment{
    constructor() {
        document.title = "EditComment";
        if (document.querySelector('main-element')) {
          this.index = document.querySelector('main-element').dataset.index;
        }
        else if (document.querySelector('main-admin-element')) {
          this.index = document.querySelector('main-admin-element').dataset.index;
        }
    }

    eventFunction() {
      this.editComment();
    }

    async getHtml() {
      const response = await fetch("/comments");
      const data = await response.json();

      console.log(data);
      const commentId = this.index;

      let commentContent = "";
      let postId = "";
      
      data.forEach(comment => {
        if (comment.id === parseInt(commentId)) {
            commentContent = comment.content;
            postId = comment.postId;
        }
      });

      console.log(commentContent);

      // 모달 창 
      // 띄우고 다시 이전 postId와 같은 보드 페이지로
      // <div class="modal__overlay"></div>
        return `
          <div class="modal">
            <div class="modal__content">
              <input id="modifyVal" placeholder="변경할 내용을 입력하세요">
              <span id="inBtn">
                <a id="ok" data-render="boardContent" data-index="${postId}" data-link>수정</a>
                <a id="cancel" data-render="boardContent" data-index="${postId}" data-link>취소</a>
              </span>
            </div>
          </div>
            `;
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

    async editComment() {
        const commentId = this.index;
        const okBtn = document.getElementById('ok');
        okBtn.addEventListener('click', async (e) => {
          e.preventDefault(); // 기본 제출 동작 방지

          const input = document.getElementById('modifyVal');
    
          console.log(JSON.stringify({
            content: input.value,
            postTime: this.generateTime(),
          }));
         
            const response = await fetch('/comments/' + commentId, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify( {
                content: input.value,
                postTime: this.generateTime(),
              })
            });
    
            if (response.ok) {
              console.log('데이터 전송 성공');
    
            } else {
              console.error('데이터 전송 실패');
            }
        });

        // const cancleBtn = document.getElementById('cancel');
        // cancleBtn.addEventListener('click', async (e) => {
        //   e.preventDefault();
        // })
      }
}
