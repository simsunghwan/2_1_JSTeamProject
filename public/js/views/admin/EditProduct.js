export default class EditProduct {
  constructor() {
    document.title = 'EditProduct';
    this.index = document.querySelector('main-admin-element').dataset.index;
    this.selectedFile;
    this.base64Data = "";
  }

  eventFunction() {
    this.convertImage();
    this.editProduct();
  }

  async getHtml() {
    const resCatecory = await fetch("/category");
    const dataCategory = await resCatecory.json(); 

    const resProduct = await fetch("/product");
    const dataProduct = await resProduct.json(); 

    const self = this;

    let title = "";
    let slug = "";
    let desc = "";
    let price = "";
    let image = "";

    let curImage = "";

    const selection = dataCategory.map(category => {
      return `
        <option value="${category.slug}">${category.title}</option>
      `;
    }).join("");

    dataProduct.forEach(product => {
      if (product.id === parseInt(self.index)) {
          title = product.title;
          slug = product.slug;
          desc = product.desc;
          price = product.price;
          image = product.image;
      }
    });

    console.log(2);

    if (image === '') {
      curImage = `<img id="curImage" src="/images/noimage.png" width=100 height=100 alt="">`
    }
    else {
      curImage = `<img id="curImage" src="${image}" width=100 height=100 alt="">`
    }

    return `
    <div class="container">
      <h2 class="page-title">Edit a product</h2>
      <a class="btn btn-primary" data-render="admin_products" data-index="" data-link>Back to all products</a>

      <br><br><br>

      <form id="edit-product-form" method="post">

        <div class="form-group">
          <label for="">Title</label>
          <input type="text" class="form-control" name="title" value="${title}" placeholder="Title">
        </div>

        <div class="form-group">
        <label for="">Slug</label>
        <input type="text" class="form-control" name="slug" value="${slug}" placeholder="Slug">
      </div>

        <div class="form-group">
          <label for="">Desciption</label>
          <textarea name="desc" class="form-control" cols="30" rows="10" placeholder="Description">${desc}</textarea>
        </div>

        <div class="form-group">
          <label for="">Category</label>
          <select name="category" class="form-control">
            ${selection}
          </select>
        </div>  

        <div class="form-group">
          <label for="">Price</label>
          <input type="text" class="form-control" name="price" value="${price}" placeholder="Price">
        </div>

        <div class="form-group">
          <label for="">Current Image</label>
          <p>
            ${curImage}
          </p>
        </div>
 
        <div class="form-group">
          <label for="">Upload Image</label>
          <input type="file" class="form-control" name="image" id="img">
          <img src="#" id="imgPreview" alt="">
        </div>

        <!-- <input type="hidden" name="pimage" value="$image here"> -->
        <button class="btn btn-default" data-render="admin_products" data-index="">Submit</button>
      </form>

      <!-- 다중 이미지 삽입은 일단 스킵 -->
      </div>
    `;
  }

  editProduct() {
    const form = document.getElementById('edit-product-form');
    const self = this;

    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 제출 동작 방지

      // 이미지 새로 바꾸지 않으면 현재 이미지 저장 구현해야 함

      const formData = new FormData(form);

      // 파일을 선택하지 않으면
      if (self.selectedFile === undefined) {
        console.log('파일 미선택');
        self.base64Data = document.getElementById('curImage').src;
      }

      const productId = self.index;
     
        await fetch('/product/' + productId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {
            title: formData.get('title'),
            slug: formData.get('slug'),
            desc: formData.get('desc'),
            category: formData.get('category'),
            price: formData.get('price'),
            image: this.base64Data 
          })
        });
    });
  }

  convertImage() {
    const inputImage = document.getElementById('img');
    const preview = document.getElementById('imgPreview');
    const self = this;

    inputImage.addEventListener('input', (e) => {
      self.selectedFile = document.getElementById("img").files[0];

        const dotIndex = self.selectedFile.name.lastIndexOf('.');
        const fileExt = self.selectedFile.name.substring(dotIndex, self.selectedFile.name.length).toLowerCase();

        const imageExt = ['.jpg', '.jpeg', '.png', '.webp'];

        imageExt.forEach(ext => {
          if (ext === fileExt) {
            let reader = new FileReader();

            reader.onload = function(e) {
              preview.setAttribute('src', e.target.result);
              preview.setAttribute('width', 100);
              preview.setAttribute('height', 100); 
     
              self.base64Data = e.target.result;
             }
             
           reader.readAsDataURL(self.selectedFile);
          }
        }) 
    }); 
  }
}




