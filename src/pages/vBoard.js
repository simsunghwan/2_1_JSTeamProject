import '../components/Section/Board/Board.js'

export default class {
  constructor() {
    document.title = 'vBoard';
  }
  getHtml() {
    return `
    <div>
      <section-board-component></section-board-component>
    </div>
      `;
  }
  

}

