export default class AdminProducts {
  constructor() {
    document.title = 'AdminProducts';

  }

  async getHtml() {

    const response = await fetch("/product");
    const data = await response.json(); 

    // 이미지의 url 을 가져와 처리
    let tableRows = '';

    if (data.length === 0) {
      return `
      <div class="container">
        <h2 class="product-title">Products 상품</h2>
        <a data-render="add_product" data-index="" class="btn btn-primary" id="btn" data-link>Add a new product</a>
        <br><br><br>
        <h3 class="text-center">There are no products.</h3>
      <div>
      `
    }
    else {
      tableRows = data.map(product => {
        if (product.image === '') {
            return `
                <tr>
                <td>${product.title}</td>
                <td>₩${product.price}</td>
                <td>${product.category}</td>
                <td><img src="/images/noimage.png" alt=""></td>
                <td><a data-render="edit_product" data-index="${product.id}" data-link>Edit</a></td>
                <td><a class="btn-delete" data-render="admin_products" data-index="${product.id}" data-link>Delete</a></td>
                </tr>
            `;
        } else {
            return `
                <tr>
                    <td>${product.title}</td>
                    <td>₩${product.price}</td>
                    <td>${product.category}</td>
                <!--    <td><img src="/product_images/${product.id}/${product.image}.png" alt=""></td> -->
                    <td><img src="${product.image}" width=100 height=100 alt=""></td> 
                    <td><a data-render="edit_product" data-index="${product.id}" data-link>Edit</a></td>
                    <td><a class="btn-delete" data-render="admin_products" data-index="${product.id}" data-link>Delete</a></td>
                </tr>
            `;
        }
    }).join("");
}
  
      return `
        <div class="container">
          <h2 class="product-title">Products 상품</h2>
          <a data-render="add_product" data-index="" class="btn btn-primary" id="btn" data-link>Add a new product</a>
          
          <br><br><br>

          <table class="table table-striped">
              <thead>
                  <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Product image</th>
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

    async pageFunction() {
        this.deleteProduct();
    }


    eventFunction() {
      const deleteBtn = document.querySelectorAll('.btn-delete');
      deleteBtn.forEach((element) => {
            element.addEventListener("click", async () => {
            const checkDelete = confirm("삭제하시겠습니까?");
            if (checkDelete) {
              const productId = element.dataset.index;
              await fetch('/product/' + productId, {
                method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                  });
            }
        });
      });
    }
}
