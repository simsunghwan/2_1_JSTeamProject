export default class {
  constructor() {
    document.title = 'AddProduct';

    this.selectCategory = '';
    this.base64Data = ''; // 공통 변수 선언
    this.isImage = false;
  }

  eventFunction() {
    this.convertImage();
    this.addProduct();
  }

  async getHtml() {
    const response = await fetch("/category");
    const data = await response.json(); 

    const selection = data.map(category => {
      return `
        <option value="${category.slug}">${category.title}</option>
      `;
    }).join("");

    return `
    <div class="container"> 
      <h2 class="page-title">Add a product</h2>
      <a class="btn btn-primary" data-render="admin_products" data-index="" data-link>Back to all products</a>

      <br><br><br>

      <form id="add-product-form" method="post">
        <div class="form-group">
          <label for="">Title</label>
          <input type="text" class="form-control" name="title" value="" placeholder="Title">
        </div>

        <div class="form-group">
        <label for="">Slug</label>
        <input type="text" class="form-control" name="slug" value="" placeholder="Slug">
      </div>

        <div class="form-group">
          <label for="">Desciption</label>
          <textarea name="desc" class="form-control" cols="30" rows="10" placeholder="Description"></textarea>
        </div>

        <div class="form-group">
          <label for="">Category</label>
          <select name="category" class="form-control">
            ${selection}
          </select>
        </div>

        <div class="form-group">
          <label for="">Price</label>
          <input type="text" class="form-control" name="price" value="" placeholder="Price">
        </div>

        <div class="form-group">
          <label for="">Image</label>
          <input type="file" class="form-control" name="image" id="img">
          <img src="#" id="imgPreview" alt="">
        </div>

        <button class="btn btn-default" data-render="admin_products" data-index="">Submit</button>
      </form>
      </div>
    `;
  }

  addProduct() {
    const form = document.getElementById('add-product-form');
    form.addEventListener('submit', async (e) => {
      console.log('form 작동');
      e.preventDefault(); // 기본 제출 동작 방지

      // 검증

      // 올바른 이미지 형식임.
      if (this.isImage) {
        console.log('isImage', this.isImage);
      }

      //////////////////////////////////////////////////////////

      const formData = new FormData(form);
     
      await fetch('/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            title: formData.get('title'),
            slug: formData.get('slug'),
            desc: formData.get('desc'),
            category: formData.get('category'),
            price: formData.get('price'),
            image: this.base64Data // 공통 변수 사용
          })
        });
    });
  }

  convertImage() {
    const inputImage = document.getElementById('img');
    const preview = document.getElementById('imgPreview');
    const self = this;

    inputImage.addEventListener('input', (e) => {
        const selectedFile = document.getElementById("img").files[0];

        const dotIndex = selectedFile.name.lastIndexOf('.');
        const fileExt = selectedFile.name.substring(dotIndex, selectedFile.name.length).toLowerCase();

        const imageExt = ['.jpg', '.jpeg', '.png', '.webp'];

        imageExt.forEach(ext => {
          if (ext === fileExt) {
            self.isImage = true;

            let reader = new FileReader();

            reader.onload = function(e) {
              preview.setAttribute('src', e.target.result);
              preview.setAttribute('width', 100);
              preview.setAttribute('height', 100); 
     
              self.base64Data = e.target.result;
             }
     
           reader.readAsDataURL(selectedFile);
          }
        }) 
    }); 
  }
}




