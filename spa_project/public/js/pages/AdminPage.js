import '../components/MainAdmin.js';
import '../components/HeaderAdmin.js';
import '../components/FooterAdmin.js';

export default class AdminPage {
  constructor() {
    
  }

  getHtml() {
    return `
      <header-admin-element data-log=""></header-admin-element>
      <main-admin-element data-render="admin_home" data-index=""></main-admin-element>
      <footer-admin-element></footer-admin-element>
    `
  }
}