export default class AddBoard{
  constructor() {
    let userId = localStorage.getItem("userID");
    let userName = localStorage.getItem("username");
    this.checkLogin(userId, userName);
    if(userId === null && userName === null){
      alert("로그인 후 이용해주세요.");
      window.history.back();
    }
    document.title = "AddBoard"
    this.base64Data = ""; // 공통 변수 선언
  }

  eventFunction() {
    this.addBoard();
  }

  async getHtml() {
    let userName = localStorage.getItem("username");
    return `
      <h2 class="page-title">게시글 작성</h2>
      <a data-render="boardView" class="btn btn-primary" data-link>뒤로가기</a>

      <br><br><br>

      <form id="add-board-form" method="post">
        <div class="form-group">
          <label for="">Title</label>
          <input type="text" class="form-control" name="title" value="" placeholder="Title">
        </div>

        <div class="form-group">
          <label for="">Writer</label>
          <input name="writer" class="form-control" value="${userName}" readonly></input>
        </div>

        <div class="form-group">
          <label for="">Content</label>
          <textarea name="content" class="form-control" cols="30" rows="10" placeholder="Content" maxlength="1000"></textarea>
        </div>

        <button class="btn btn-default" data-render="boardView">Submit</button>
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

  checkLogin(argUserId, argUserName) {
    console.log("로그인 체크");
    console.log(argUserId);
    console.log(argUserName);
  }

  addBoard() {
  console.log('addBoard 실행');

  const form = document.getElementById('add-board-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지

    const formData = new FormData(form);

    console.log(JSON.stringify({
      title: formData.get('title'),
      writer: formData.get('writer'),
      content: formData.get('content'),
      createdAt: this.toStringByFormatting(new Date()),
      hit: 0,
  }))
     
    const response = await fetch('/board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        title: formData.get('title'),
        writer: formData.get('writer'),
        content: formData.get('content'),
        createdAt: this.toStringByFormatting(new Date()),
        hit:  0,
      })
    });

    if (response.ok) {
      console.log('데이터 전송 성공');

    } else {
      console.error('데이터 전송 실패');
    }
    });
    console.log('addBoard 종료')
  }
}




