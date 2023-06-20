export default class CorrectionUser {
  constructor() {
    document.title = 'CorrectionUser';
    this.index = document.querySelector('main-element').dataset.index;
  }

  

  async getHtml() {
    return `

    <div class='container'>
    <h1>CorrectionUser</h1>
                
    <form id="CorrectionUser-form" method="post">

    <div class="form-group">
      <label>Name</label>
      <input type="text" name="name" class="form-control" placeholder="Name">
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" name="email" class="form-control" placeholder="Email">
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" name="password" class="form-control" placeholder="Password">
    </div>

    <div class="form-group">
      <label>Confirm Password</label>
      <input type="password" name="confirmPassword" class="form-control" placeholder="Confirm Password">
    </div>
    <div class="sign_error" style="color:red"> </div>

    <button class="btn btn-default" data-index="">Submit</button>
  </form>
    
    </div>
    `;
  }

  eventFunction() {
    const form = document.getElementById('CorrectionUser-form');
    const mainElement = document.querySelector('main-element');
    const headerElement = document.querySelector('header-element');
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 제출 동작 방지

      const formData = new FormData(form);
      
      const $sign_error = document.querySelector(".sign_error");  
      $sign_error.textContent = "";


      if (formData.get('password') !== formData.get('confirmPassword')) {
        $sign_error.textContent = "Password가 일치하지 않습니다.";
        return;
      }

      
      const response = await fetch("/user");
      const data = await response.json();

      const user = data.find(user => 
        user.userid === localStorage.getItem('userID')
      );
      
      
      let name = formData.get('name');
      let email = formData.get('email');
      let password = formData.get('password');

      if (formData.get('name') === "" ) {
        name = user.name;
      }
      
      if (formData.get('email') === "" ) {
        email = user.email;
      }

      if (formData.get('password') === "" ) {
        password = user.password;
      }
      //////////////////////////////////////////////////////////

      $sign_error.textContent = "";
      await fetch(`/user/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
          
        })
      });
      

      let userType = localStorage.getItem('userType');

      localStorage.clear();

      if (userType === "admin") {
        localStorage.setItem("userType", "admin");
        localStorage.setItem("userID", user.id);
        localStorage.setItem("username", name);
      
      } else {
        localStorage.setItem("userType", "user");
        localStorage.setItem("userID", user.id);
        localStorage.setItem("username", name);
      }  

      alert('수정 완료!');
      headerElement.setAttribute('data-log', '');
      mainElement.setAttribute('data-render', 'login');
        
      
      
      
      
    });

  }

}