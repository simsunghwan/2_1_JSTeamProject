import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("AdminCategories/AddCategory");
  }

  async pageFunction() {
    this.addCategory();
  }

  async getHtml() {
    return `
      <h2 class="page-title">Add a category</h2>
      <a href="/admin/categories" class="btn btn-primary" data-link>Back to all categories</a>

      <br><br><br>

      <form id="add-categories-form" method="post">
        <div class="form-group">
          <label for="">Title</label>
          <input type="text" class="form-control" name="title" value="" placeholder="Title">
        </div>

        <button class="btn btn-default" data-href="/admin/categories">Submit</button>
      </form>
    `;
  }

  addCategory() {
    const form = document.getElementById('add-categories-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 제출 동작 방지

      const formData = new FormData(form);

      console.log(JSON.stringify({
        title: formData.get('title')
      }));
     
        const response = await fetch('/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            title: formData.get('title')
          })
        });

        if (response.ok) {
          console.log('데이터 전송 성공');

        } else {
          console.error('데이터 전송 실패');
        }
    });
  }
}



