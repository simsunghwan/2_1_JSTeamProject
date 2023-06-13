import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("About");
  }

  async pageFunction() {
    return;
  }

  async getHtml() {
    const response = await fetch("/data/page");
    const data = await response.json();

    // Generate the HTML table
    const tableRows = data.map(page => `
      <tr>
        <td>${page.id}</td>
        <td>${page.title}</td>
        <td>${page.slug}</td>
        <td>${page.content}</td>
        <td>${page.sorting}</td>
      </tr>
    `).join("");

    this.innerHTML = `
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Content</th>
            <th>Sorting</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }
}
