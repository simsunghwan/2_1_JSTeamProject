export default class CorrectionUser {
  constructor() {
    document.title = 'CorrectionUser';
    this.index = document.querySelector('main-element').dataset.index;
  }

  // eventFunction() {
  //   this.register();
  // }

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

  ////////////////

    <div class="form-group">
      <label>Password</label>
      <input type="password" name="password" class="form-control" placeholder="Password">
    </div>

    <div class="form-group">
      <label>Confirm Password</label>
      <input type="password" name="confirmPassword" class="form-control" placeholder="Confirm Password">
    </div>
    <div class="sign_error" style="color:red"> </div>
    <div class="sign_success" style="color:rgb(12, 255, 69)"> </div>

    <button class="btn btn-default" data-index="">Submit</button>
  </form>
    
    </div>
    `;
  }

  eventFunction() {
    const form = document.getElementById('register-form');
    const mainElement = document.querySelector('main-element');
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 제출 동작 방지

      const formData = new FormData(form);
      
      const $sign_error = document.querySelector(".sign_error");  
      $sign_error.textContent = "";


      if (formData.get('name') === "") {
        $sign_error.textContent = "Name이 비어있습니다. 모든 정보를 입력해주세요.";
        return;
      }
      if (formData.get('email') === "") {
        $sign_error.textContent = "Email이 비어있습니다. 모든 정보를 입력해주세요.";
        return;
      }
      if (formData.get('userid') === "") {
        $sign_error.textContent = "UserID가 비어있습니다. 모든 정보를 입력해주세요.";
        return;
      }
      if (formData.get('password') === "") {
        $sign_error.textContent = "Password가 비어있습니다. 모든 정보를 입력해주세요.";
        return;
      }
      if (formData.get('confirmPassword') === "") {
        $sign_error.textContent = "Confirm Password가 비어있습니다. 모든 정보를 입력해주세요.";
        return;
      }
      if (formData.get('password') !== formData.get('confirmPassword')) {
        $sign_error.textContent = "Password가 일치하지 않습니다.";
        return;
      }

      
      const response = await fetch("/user");
      const data = await response.json();

      const signupUser = data.find(user => 
        user.userid === formData.get('userid')
      );


      if (signupUser) {
        $sign_error.textContent = "UserID가 중복됩니다.";
        return;
      }


      //////////////////////////////////////////////////////////

      $sign_error.textContent = "";
        await fetch('/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.get('name'),
            email: formData.get('email'),
            userid: formData.get('userid'),
            password: formData.get('password'),
            isAdmin: 0
          })
        });

        alert('가입 완료!');
        mainElement.setAttribute('data-render', 'login');
          
      
      
      
      
    });

  }

}