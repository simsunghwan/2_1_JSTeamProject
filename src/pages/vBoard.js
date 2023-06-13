import '../components/Section/Board/Board.js'
import '../components/Header/Header.js';

export default class {
  constructor() {
    document.title = 'vBoard';
  }
<<<<<<< HEAD
  getHtml() {
    return `
    <div>
      <section-board-component></section-board-component>
    </div>
      `;
=======
  
  async getHtml() {
    return `
      <header-component></header-component>
      <section-board-component></section-board-component>
    `;
>>>>>>> 6d285861f812483ee39c9ee2ba5a9f679eed2f7e
  }
  

}

