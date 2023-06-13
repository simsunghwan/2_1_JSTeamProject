import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("AdminCategories");
    }

    async getHtml() {
        const response = await fetch("/category");
        const data = await response.json(); 

        const tableRows = data.map(category => {
          return `
              <tr>
                  <td>${category.title}</td>
                  <td><a href="/admin/categories/edit-category/${category.id}" data-link>Edit</a></td>
                  <td><a class="confirmDeletion" href="/admin/categories/delete-category/${category.id}" data-link>Delete</a></td>
              </tr>
          `;
        }).join("");

        return `
            <h2 class="page-title">Categories</h2>
            <a href="/admin/categories/add-category" class="btn btn-primary" id="btn" data-link>Add a new category</a>
            
            <br><br><br>

            <table class="table table-striped">
                <thead>
                    <tr>
                      <th>Category</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            `;
    }

    async pageFunction() {
      this.deleteCategory();
    }

    deleteCategory() {
      const $confirmDeletion = document.querySelectorAll('.confirmDeletion');
      $confirmDeletion.forEach(element => {
            element.addEventListener("click", async (e) => {
            const checkDelete = confirm("삭제하시겠습니까?");
            if (checkDelete) {
                const categoryId = e.target.href.replace("http://localhost:3003/admin/categories/delete-category/", "");
                const response = await fetch('/category/' + categoryId, {
                method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                     }
                  });
          
                  // 응답 처리
                  if (response.ok) {
                    console.log('Data submitted successfully');
          
                  } else {
                    console.error('Error submitting data');
                  }
            }
        });
      });
    }
}
