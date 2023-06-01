// 게시판 조회 했을 때의 동작 구현 파일입니다.
const getPosts = (e) => {
  vBoard();

  fetch('http://localhost:3000/posts') // method 를 get 방법으로 호출함
    .then((response) => {
      console.log(response.status);
      return response.json()}) // 정상적으로 데이터를 받아 왔을 때
    // response.json() => 받아온 데이터를 json 형태로 변환해줌
    .then( // 작동 하는 알고리즘
      (data) => { 
        console.log(data);
        boardData = Array.from(data);
        boardData.sort((a, b) => b.id - a.id);
        console.log(boardData);

        $boardList.innerHTML = '';
        $boardList.appendChild($top);

        boardData.forEach((v, i) => {
          const $divRow = document.createElement('div');

          const $divNum = document.createElement('div');
          $divNum.className = 'num';
          $divNum.textContent = boardData.length - i;

          const $divTitle = document.createElement('div');
          $divTitle.className = 'title';
          $divTitle.id = `${v.id}`;
          $divTitle.innerHTML = `<a href="" class="boardTitle")">${v.title}</a>`;

          const $divWriter = document.createElement('div');
          $divWriter.className = 'writer';
          $divWriter.textContent = `${v.writer}`;

          const $divDate = document.createElement('div');
          $divDate.className = 'date';
          $divDate.textContent = `${v.createdAt}`;

          const $divCount = document.createElement('div');
          $divCount.className = 'count';
          $divCount.innerText = `${v.hit}`;

          $divRow.append($divNum, $divTitle, $divWriter, $divDate, $divCount);
          $boardList.appendChild($divRow);
        });
        const $clickTitles = document.querySelectorAll('.title');
        $clickTitles.forEach(function(title){
          title.addEventListener('click', function(e){
            if(e.target.classList.contains('boardTitle')){
              e.preventDefault();
              console.log(e.target.parentNode.id);
              viewContent(e);
            }
          });
        });
      }
    );
};