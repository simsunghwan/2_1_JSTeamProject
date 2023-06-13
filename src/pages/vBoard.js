import '../components/Section/Board/Board.js'
import '../components/Header/Header.js';

export default class {
  constructor() {
    document.title = 'vBoard';
  }
  
  async getHtml() {
    return `
      <header-component></header-component>
      <section-board-component></section-board-component>
    `;
  }
}