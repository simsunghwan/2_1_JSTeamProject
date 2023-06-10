class Board extends HTMLElement {
  constructor() {
    super();

    fetch('http://localhost:3000/posts') // method 를 get 방법으로 호출함
    .then((response) => {
      console.log(response.status);
      return response.json()}) // 정상적으로 데이터를 받아 왔을 때
    // response.json() => 받아온 데이터를 json 형태로 변환해줌
    .then( // 작동 하는 알고리즘
      (data) => { 
        console.log("success");
      });

    this.innerHTML = 
    `
      <div>안녕</div>
    `

  }
}

window.customElements.define('section-board-component', Board);