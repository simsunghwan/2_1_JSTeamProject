export default class Register {
  constructor() {
    document.title = 'Register';
    this.index = document.querySelector('main-element').dataset.index;
  }

  // eventFunction() {
  //   this.register();
  // }

  async getHtml() {
    return `

    <div class='container'>
    <h1>Register</h1>
                
    <form id="register-form" method="post">

    <div class="form-group">
      <label>Name</label>
      <input type="text" name="name" class="form-control" placeholder="Name">
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" name="email" class="form-control" placeholder="Email">
    </div>

    <div class="form-group">
      <label>UserID</label>
      <input type="text" name="userid" class="form-control" placeholder="UserID">
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" name="password" class="form-control" placeholder="Password">
    </div>

    <div class="form-group">
      <label>Confirm Password</label>
      <input type="password" name="confirmPassword" class="form-control" placeholder="Confirm Password">
    </div>

    <button class="btn btn-default" data-render="" data-index="">Submit</button>
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
      
      // 검증 구현 return boolean 으로 구현 *** /////////////////////

      // 각 입력별 양식 모두 체크, 아이디 중복 체크, 비밀번호 동일 여부 체크 등

      // 하나라도 false 라면 에러, 모두 true 일 경우에만 통과
  
      //////////////////////////////////////////////////////////

      if (true) { // 검증 여부 true
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
      }
    });

  }

}