
const $loginBtn = document.querySelector('#loginBtn');



let flag = false;

$loginBtn.addEventListener('click', async (e)=>{
   e.preventDefault();
    
    const $login = document.querySelector('#login');
    const $inputLogin = document.querySelector('#input_login');
    const $inputPw = document.querySelector('#input_pw');
    const $errorMessage = document.querySelector('.error_message');


    const id = $inputLogin.value;
    const pw = $inputPw.value;
    $errorMessage.textContent = "";
    
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
    flag = false;
    await checkUser(id, pw);

    if( flag === false) {
        return;
    }
    
    // console.log( sessionStorage.getItem('userId'));
    console.log("로그인 되었습니다.");
    $login.classList.replace('show','hidden');
})

async function checkUser(id, pw) {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    let idData = Array.from(data);
    // console.log(idData);
    
    for (const user of idData) {

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