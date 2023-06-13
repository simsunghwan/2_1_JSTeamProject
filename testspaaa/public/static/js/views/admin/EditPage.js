import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("AdminPages/EditPage");
    }

    async getHtml() {
      const response = await fetch("/page");
      const data = await response.json();

      console.log(data);
      const pageId = location.pathname.replace("/admin/pages/edit-page/", "");

      let title = "";
      let slug = "";
      let content = "";
      
      data.forEach(page => {
        if (page.id === parseInt(pageId)) {
            title = page.title;
            slug = page.slug;
            content = page.content;
        }
      });

      console.log(title);

        return `
        <h2 class="page-title">Edit a page</h2>
        <a href="/admin/pages" class="btn btn-primary" data-link>Back to all pages</a>
  
        <br><br><br>
  
        <form id="edit-page-form" method="post">
          <div class="form-group">
            <label for="">Title</label>
            <input type="text" class="form-control" name="title" value= "${title}" placeholder="Title">
          </div>
  
          <div class="form-group">
            <label for="">Slug</label>
            <input type="text" class="form-control" name="slug" value= "${slug}" placeholder="Slug">
          </div>
  
          <div class="form-group">
            <label for="">Content</label>
            <textarea name="content" class="form-control" cols="30" rows="10" placeholder="Content">${content}</textarea>
          </div>
  
          <button class="btn btn-default" data-href="/admin/pages">Submit</button>
        </form>
            `;
    }

    async pageFunction() {
      this.editPage();
      }

    async editPage() {
        const pageId = location.pathname.replace("/admin/pages/edit-page/", "");
        const form = document.getElementById('edit-page-form');
        form.addEventListener('submit', async (e) => {
          e.preventDefault(); // 기본 제출 동작 방지

          const formData = new FormData(form);
    
          console.log(JSON.stringify({
            title: formData.get('title'),
            slug: formData.get('slug'),
            content: formData.get('content')
          }));
         
            const response = await fetch('/page/' + pageId, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify( {
                title: formData.get('title'),
                slug: formData.get('slug'),
                content: formData.get('content')
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
