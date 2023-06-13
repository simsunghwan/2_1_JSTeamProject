import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("AdminProducts/AddProduct");
    this.base64Data = ""; // 공통 변수 선언
  }

  async pageFunction() {
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
      <h2 class="page-title">Add a product</h2>
      <a href="/admin/products" class="btn btn-primary" data-link>Back to all products</a>

      <br><br><br>

      <form id="add-product-form" method="post">
        <div class="form-group">
          <label for="">Title</label>
          <input type="text" class="form-control" name="title" value="" placeholder="Title">
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

        <button class="btn btn-default" data-href="/admin/products">Submit</button>
      </form>
    `;
  }

  addProduct() {
    console.log('addProduct 실행');

    const form = document.getElementById('add-product-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 제출 동작 방지

      const formData = new FormData(form);

      console.log(JSON.stringify({
        title: formData.get('title'),
        desc: formData.get('desc'),
        category: formData.get('category'),
        price: formData.get('price'),
        image: this.base64Data // 공통 변수 사용
      }));
     
        const response = await fetch('/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            title: formData.get('title'),
            desc: formData.get('desc'),
            category: formData.get('category'),
            price: formData.get('price'),
            image: this.base64Data // 공통 변수 사용
          })
        });

        if (response.ok) {
          console.log('데이터 전송 성공');

        } else {
          console.error('데이터 전송 실패');
        }
    });
    console.log('addProduct 종료')
  }

  convertImage() {
    console.log('convertImage 실행');
    const inputImage = document.getElementById('img');
    const preview = document.getElementById('imgPreview');
    const self = this;

    inputImage.addEventListener('input', (e) => {
        let reader = new FileReader();
        const selectedFile = document.getElementById("img").files[0];

        reader.onload = function(e) {
         preview.setAttribute('src', e.target.result);
         preview.setAttribute('width', 100);
         preview.setAttribute('height', 100); 

         self.base64Data = e.target.result;
        }

      reader.readAsDataURL(selectedFile);
    }); 
    console.log('convertImage 종료');
  }
}




