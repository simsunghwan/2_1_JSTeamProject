
export default class AdminCategories {
  constructor() {
    document.title = 'Categories';
  }

  async getHtml() {

    
    const response = await fetch("/category");
    const data = await response.json(); 

    const tableRows = data.map(category => {
      return `
        <tr>
            <td>${category.title}</td>
            <td><a data-render="edit_category" data-index="${category.id}" data-link>Edit</a></td>
            <td><a class="btn-delete" data-render="admin_categories" data-index="${category.id}" data-link>Delete</a></td>
        </tr>
      `;
      }).join("");

      return `
        <div class="container">
          <h2 class="page-title">Categories 카테고리</h2>
          <a class="btn btn-primary" id="btn" data-render="add_category" data-index="" data-link>Add a new category</a>
          
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
        </div>
      `;
  }

  eventFunction() {
    const deleteBtn = document.querySelectorAll('.btn-delete');
    // 모든 버튼 마다 이벤트를 추가
    deleteBtn.forEach((element) => {
      element.addEventListener("click", async () => {

        const checkDelete = confirm("삭제하시겠습니까?");
        
        if (checkDelete) {
          const categoryId = element.dataset.index;
          await fetch('/category/' + categoryId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
          });   
        }
      });
    });
  }
}
