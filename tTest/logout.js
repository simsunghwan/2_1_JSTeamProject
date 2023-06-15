
const $logoutBtn = document.querySelector('#logoutBtn');

$logoutBtn.addEventListener('click',(e)=>{ 
    e.preventDefault();

    const $inputLogin = document.querySelector('#input_login');
    const $inputPw = document.querySelector('#input_pw');
    const $errorMessage = document.querySelector('.error_message');
    const $login = document.querySelector('#login');

    $inputLogin.value  = "";
    $inputPw.value = ""; 
    $errorMessage.textContent = "";
    $login.classList.replace('hidden','show');

    sessionStorage.clear();
    // console.log(sessionStorage.getItem(userId));
    console.log("로그아웃 되었습니다");

} )