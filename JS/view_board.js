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
        $boardList.appendChild($boardTop);

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

// 게시판 title 클릭 시 내용 보여주기
function viewContent(e) {
  vBoard();

  fetch('http://localhost:3000/posts/' + e.target.parentNode.id)
  .then ((response) => response.json())
  .then ((json) => {
    console.log(json);
    $boardList.innerHTML = '';
    $boardList.appendChild($boardTop);

    const $divTop = document.createElement('div');
    const $divBox = document.createElement('div');
    $divBox.className = 'container';

    const divNum = document.createElement('div');
    divNum.className = 'num';
    divNum.textContent = `${json.id}`;
    
    const divTitle = document.createElement('div');
    divTitle.className = 'title';
    divTitle.id = `${json.id}`;
    divTitle.innerHTML = `<h3>${json.title}</h3>`;

    const divWriter = document.createElement('div');
    divWriter.className = 'writer';
    divWriter.textContent = `${json.writer}`;

    const divDate = document.createElement('div');
    divDate.className = 'date';
    divDate.textContent = `${json.createdAt}`;

    const divCount = document.createElement('div');
    divCount.className = 'count';
    divCount.innerText = `${json.hit}`;

    const $divConText = document.createElement('div');
    $divConText.className = 'vText';
    const $h3TextContainer =  document.createElement('h3');
    $h3TextContainer.className = 'vText-container';
    $h3TextContainer.innerText = "내용";

    const $divContent = document.createElement('div');
    $divContent.className = 'vContent';
    $divContent.textContent = `${json.content}`;
    
    $divTop.append(divNum, divTitle, divWriter, divDate, divCount);
    $divBox.append($divConText,$divContent);
    $divConText.appendChild($h3TextContainer);
    $boardList.append($divTop, $divBox);       
  })
}