
const $loginBtn = document.querySelector('#loginBtn');
const $errorMessage = document.querySelector('.error_message');
const $login = document.querySelector('#login');

let flag = false;

$loginBtn.addEventListener('click', async (e)=>{
   e.preventDefault();
    $errorMessage.textContent = "";

    const $inputLogin = document.querySelector('#input_login');
    const $inputPw = document.querySelector('#input_pw');
    
    const id = $inputLogin.value;
    const pw = $inputPw.value;
    if(id === "") {
        $errorMessage.textContent = '아이디를 입력해주세요';
        return;
    }
    if(pw === "") {
        $errorMessage.textContent = '비밀번호를 입력해주세요';
        return;
    }
    
    // console.log(id);
    // console.log(pw);
    await checkUser(id, pw);

    if( flag === false) {
        return;
    }
    
    console.log( sessionStorage.getItem('userId'));
    $login.classList.replace('show','hidden');
})

async function checkUser(id, pw) {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    let idData = Array.from(data);
    // console.log(idData);
    
    for (const user of idData) {
        // console.log(typeof user.userId);
        // console.log(typeof +id);
        if (user.userId === id){
            flag = true;
            break;
        }
    }
    if(flag === false) {
        // console.log(flag);
        $errorMessage.textContent = '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.';
        return flag;
    }
    flag = false;
    for (const user of idData) {
        // console.log(typeof user.userId);
        // console.log(typeof +id);
        if (user.userPW === pw){
            flag = true;
            break;
        }   
    }
    
    // console.log(flag);

    if( flag === false) {
        $errorMessage.textContent = '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.';
        return flag;
    }

    sessionStorage.setItem('userId', id);
    
   
    


}