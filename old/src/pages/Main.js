import '../components/Header/Header.js'
import '../components/Section/Board/Board.js'

export default class {
  constructor() {
    document.title = 'Main';
  }
  getHtml() {
    return `
      <header-component>
      
      </header-component>
    
      <section-board-component>
      
      </section-board-component>
    `
    
    ;
  }
}