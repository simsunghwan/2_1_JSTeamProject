import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("AdminPages");
    }

    async getHtml() {
        console.log(this.innerHTML)
        const response = await fetch("/page");
        const data = await response.json(); 

        const tableRows = data.map(page => {
            if (page.id === 1) {
                return `
                    <tr>
                        <td>${page.title}</td>
                        <td><a href="/admin/pages/edit-page/${page.id}" data-link>Edit</a></td>
                        <td></td>
                    </tr>
                `;
            } else {
                return `
                    <tr>
                        <td>${page.title}</td>
                        <td><a href="/admin/pages/edit-page/${page.id}" data-link>Edit</a></td>
                        <td><a class="confirmDeletion" href="/admin/pages/delete-page/${page.id}" data-link>Delete</a></td>
                    </tr>
                `;
            }
        }).join("");
        
        return `
            <h2 class="page-title">Pages</h2>
            <a href="/admin/pages/add-page" class="btn btn-primary" id="btn" data-link>Add a new page</a>
            
            <br><br><br>

            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Title</th>
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
        this.deletePage();
    }

    deletePage() {
      const $confirmDeletion = document.querySelectorAll('.confirmDeletion');
      $confirmDeletion.forEach(element => {
            element.addEventListener("click", async (e) => {
            const checkDelete = confirm("삭제하시겠습니까?");
            if (checkDelete) {
                const pageId = e.target.href.replace("http://localhost:3003/admin/pages/delete-page/", "");
                const response = await fetch('/page/' + pageId, {
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
