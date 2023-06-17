export default class AddCategory {
  constructor() {
    document.title = 'AddCategory';
  }

  async pageFunction() {
    this.addCategory();
  }

  async getHtml() {
    return `
    <div class="container">
      <h2 class="page-title">Add a category</h2>
      <a class="btn btn-primary" data-render="admin_categories" data-index="" data-link>Back to all categories</a>

      <br><br><br>

      <form id="add-categories-form" method="post">

        <div class="form-group">
          <label for="">Title</label>
          <input type="text" class="form-control" name="title" value="" placeholder="Title">
        </div>

        <button class="btn btn-default" data-render="admin_categories" data-index="">Submit</button>

      </form>
      </div>
    `; 
  }

  eventFunction() {
    const form = document.getElementById('add-categories-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 제출 동작 방지

      const formData = new FormData(form);
     
      await fetch('/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.get('title'),
          slug: formData.get('title').toLowerCase()
        })
      });
    });
  }
}



