export default class Login {
  constructor() {
    document.title = 'Login';
    this.index = document.querySelector('main-element').dataset.index;
  }

  async eventFunction() {
    this.login();
  }

  async getHtml() {

      return `
      <div class='container'>
        <h1>Login</h1>
                    
        <form id="login-form" method="post">

        <div class="form-group">
          <label>UserID</label>
          <input type="text" name="userid" class="form-control" placeholder="UserID">
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" name="password" class="form-control" placeholder="Password">
        </div>
        <div class="error_message" style="color:red"> </div>
        <button class="btn btn-default data-index="">Submit</button>
      </form>
        
    </div>
      `;
  }

    login() {
  
      const form = document.getElementById('login-form');
      const mainElement = document.querySelector('main-element');
      const headerElement = document.querySelector('header-element');
      form.addEventListener('submit', async (e) => {
        console.log('form 작동');
        e.preventDefault(); // 기본 제출 동작 방지
  
        // 1. 클라이언트가 id와 pw를 서버에 전송
        // 2. 서버에서 데이터베이스를 조회하여 id와 pw 일치 여부를 확인
        // -> 서버 측에서 코드를 작성할 수 없으니 클라이언트 측에서 데이터를 요청한 뒤,
        //    응답받은 데이터와 폼 데이터를 직접 비교하는 것으로 대체.
        // 3. 일치할 경우 서버 측에서 세션 아이디를 포함하여 응답 후 브라우저에 세션 아이디 부여
        // -> 서버 측 코드 작성 대신 로컬 스토리지에 유저 아이디를 저장하는 것으로 대체
        // 4. 클라이언트가 페이지 요청 시 세션 아이디를 함께 보내고 서버 측에서 해당
        //    세션 아이디의 로그인 여부를 확인
        // 5. true 일 경우 올바른 페이지 렌더링, false 일 경우 에러.

        const response = await fetch("/user");
        const data = await response.json(); 

        const formData = new FormData(form);

        // 비밀번호와 같은 개인 정보를 평문으로 비교하는 것은 보안에 매우 취약함.
        // 비밀번호 암호화 필요.

        const $errorMessage = document.querySelector('.error_message');
        $errorMessage.textContent = "";

        const loggedInUser = data.find(user => 
          user.userid === formData.get('userid') &&
          user.password === formData.get('password') 
        );



        if (loggedInUser) {
          if (loggedInUser.isAdmin === 1) {
            // 관리자 계정으로 로그인 성공
            localStorage.setItem("userType", "admin");
            localStorage.setItem("userID", loggedInUser.userid);
            localStorage.setItem("username", loggedInUser.username);
          } else {
            // 일반 사용자 계정으로 로그인 성공
            localStorage.setItem("userType", "user");
            localStorage.setItem("userID", loggedInUser.userid);
            localStorage.setItem("username", loggedInUser.username);
          }
          headerElement.setAttribute('data-log', '');
          mainElement.setAttribute('data-render', 'home');
          
        } 
        else {
          if(formData.get('userid') === "") {
            $errorMessage.textContent = '아이디를 입력해주세요';
            return;
          }
          if(formData.get('password') === "") {
              $errorMessage.textContent = '비밀번호를 입력해주세요';
              return;
          }
          // 로그인 실패
          $errorMessage.textContent = '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.';
          console.log("로그인 실패");
        }      
      });
    }


}