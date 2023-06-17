export default class EditCategory {
  constructor() {
      document.title = 'EditCategory';
      this.index = document.querySelector('main-admin-element').dataset.index;
      this.curTitle = '';
  }

    async getHtml() {
      const response = await fetch("/category");
      const data = await response.json();
      const self = this;

      let title = "";
      // let slug = "";
      // let content = "";
      
      data.forEach(category => {
        if (category.id === parseInt(self.index)) {
          console.log(category.id);
            title = self.curTitle = category.title;
            // slug = category.slug;
            // content = category.content;
        }
      });

        return `
        <div class="container">
        <h2 class="page-title">Edit a category</h2>
        <a class="btn btn-primary" data-render="admin_categories" data-index="" data-link>Back to all categories</a>
  
        <br><br><br>
  
        <form id="edit-category-form" method="post">

          <div class="form-group">
            <label for="">Title</label>
            <input type="text" class="form-control" name="title" value= "${title}" placeholder="Title">
          </div>
  
          <button class="btn btn-default" data-render="admin_categories" data-index="">Submit</button>
        </form>
        </div>
            `;
    }

    async pageFunction() {
      this.editCategory();
      }

  eventFunction() {
    const form = document.getElementById('edit-category-form');
    const self = this;
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 제출 동작 방지

      const formData = new FormData(form);

      const categoryId = self.index;

      await fetch('/category/' + categoryId, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {
          title: formData.get('title'),
          // 수정해야 함
          slug: formData.get('title')
        })
      });

      // 카테고리의 타이틀 변경 시 자동으로 프로덕트의 카테고리도 동일하게 변경해야 함!!

      const resProduct = await fetch("/product");
      const dataProduct = await resProduct.json(); 

      // 수정하기 전의 카테고리 타이틀과 프로덕트의 카테고리가 같은 것의 id가 모인 배열
      // [1, undefined, 3, undefined, 5, 6, 7, undefined ...] 
      const prodCategoryId = dataProduct.map(product => {
        if (product.category === self.curTitle) {
          return product.id;
        }
      });

      // 위의 배열에서 바꾸려는 대상의 id만으로 구성된 배열을 구성한다.
      // [1, 3, 5, 6, 7, ...]
      const filteredId = prodCategoryId.filter(id => id !== undefined);

      // id를 대입하여 수정한 후의 카테고리 타이틀을 PATCH를 통해 부분 수정한다.
      filteredId.forEach(id => {
        fetch('/product/' + id, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {
            category: formData.get('title')
          })
        });
      });
    });
  }
}
