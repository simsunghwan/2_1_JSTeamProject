import '../components/Main.js';
import '../components/Header.js';
import '../components/Footer.js';

export default class Page {
  constructor() {
    
  }

  getHtml() {
    return `
      <header-element data-log=""></header-element>
      <main-element data-render="home" data-index=""></main-element>
      <footer-element></footer-element>
    `
  }
}