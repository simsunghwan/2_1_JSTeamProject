export default class Board {
  constructor() {
    document.title = 'Board';
  }

  eventFunction() {}

  async getHtml() {

    return `
    <div class='container'>
      <h1>게시판 페이지</h1>
    </div>
    `
  }
}