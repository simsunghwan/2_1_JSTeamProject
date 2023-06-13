import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("AdminCategories/EditCategory");
    }

    async getHtml() {
      const response = await fetch("/category");
      const data = await response.json();

      console.log(data);
      const categoryId = location.pathname.replace("/admin/categories/edit-category/", "");

      let title = "";
      let slug = "";
      let content = "";
      
      data.forEach(category => {
        if (category.id === parseInt(categoryId)) {
            title = category.title;
            // slug = category.slug;
            // content = category.content;
        }
      });

        return `
        <h2 class="page-title">Edit a category</h2>
        <a href="/admin/categories" class="btn btn-primary" data-link>Back to all categories</a>
  
        <br><br><br>
  
        <form id="edit-category-form" method="post">
          <div class="form-group">
            <label for="">Title</label>
            <input type="text" class="form-control" name="title" value= "${title}" placeholder="Title">
          </div>
  
          <button class="btn btn-default" data-href="/admin/categories">Submit</button>
        </form>
            `;
    }

    async pageFunction() {
      this.editCategory();
      }

    async editCategory() {
        const categoryId = location.pathname.replace("/admin/categories/edit-category/", "");
        const form = document.getElementById('edit-category-form');
        form.addEventListener('submit', async (e) => {
          e.preventDefault(); // 기본 제출 동작 방지

          const formData = new FormData(form);
    
          console.log(JSON.stringify({
            title: formData.get('title')
          }));
         
            const response = await fetch('/category/' + categoryId, {
              method: 'PUT',
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
