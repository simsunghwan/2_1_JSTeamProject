import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("AdminProducts");
    }

    async getHtml() {
        const response = await fetch("/product");
        const data = await response.json(); 

        // 이미지의 url 을 가져와 처리
        let tableRows = '';

        if (data.length === 0) {
          return `
          <h2 class="product-title">Products</h2>
          <a href="/admin/products/add-product" class="btn btn-primary" id="btn" data-link>Add a new product</a>
          <br><br><br>
          <h3 class="text-center">There are no products.</h3>`
        }
        else {
          tableRows = data.map(product => {
            if (product.image === "") {
                return `
                    <tr>
                    <td>${product.title}</td>
                    <!--<td>${product.price}</td> -->
                    <td>${parseFloat(product.price).toFixed(2)}</td>
                    <td>${product.category}</td>
                    <td><img src="/images/noimage.png" alt=""></td>
                    <td><a href="/admin/products/edit-product/${product.id}" data-link>Edit</a></td>
                    <td><a class="confirmDeletion" href="/admin/products/delete-product/${product.id}" data-link>Delete</a></td>
                    </tr>
                `;
            } else {
                return `
                    <tr>
                        <td>${product.title}</td>
                        <!--<td>${product.price}</td> -->
                        <td>${parseFloat(product.price).toFixed(2)}</td>
                        <td>${product.category}</td>
                    <!--    <td><img src="/product_images/${product.id}/${product.image}.png" alt=""></td> -->
                        <td><img src="${product.image}" width=100 height=100 alt=""></td> 
                        <td><a href="/admin/products/edit-product/${product.id}" data-link>Edit</a></td>
                        <td><a class="confirmDeletion" href="/admin/products/delete-product/${product.id}" data-link>Delete</a></td>
                    </tr>
                `;
            }
        }).join("");
    }


        return `
            <h2 class="product-title">Products</h2>
            <a href="/admin/products/add-product" class="btn btn-primary" id="btn" data-link>Add a new product</a>
            
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
            `;
    }

    async pageFunction() {
        this.deleteProduct();
    }


    deleteProduct() {
      const $confirmDeletion = document.querySelectorAll('.confirmDeletion');
      $confirmDeletion.forEach(element => {
            element.addEventListener("click", async (e) => {
            const checkDelete = confirm("삭제하시겠습니까?");
            if (checkDelete) {
                const productId = e.target.href.replace("http://localhost:3000/admin/products/delete-product/", "");
                const response = await fetch('/product/' + productId, {
                method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                     },
                    // body: JSON.stringify( {
                    //   title: formData.get('title'),
                    //   slug: formData.get('slug'),
                    //   content: formData.get('content')
                    // })
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
