
const $loginBtn = document.querySelector('#loginBtn');

$loginBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    const $inputLogin = document.querySelector('#input_login');
    const $inputPw = document.querySelector('#input_pw');

    const id = $inputLogin.value;
    const pw = $inputPw.value;
    console.log(id);
    console.log(pw);
    
    checkUser(id, pw);
})

async function checkUser(id, pw) {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    let idData = Array.from(data);
    // console.log(idData);
 

    let flag = false;
    
    for (const user of idData) {
        // console.log(typeof user.userId);
        // console.log(typeof +id);
        if (user.userId === +id){
            flag = true;
            break;
        }
    }
    if (flag === true) {
        flag = false;
        for (const user of idData) {
            // console.log(typeof user.userId);
            // console.log(typeof +id);
            if (user.userPW === +pw){
                flag = true;
                break;
            }
        }
    }
    
    console.log(flag)
    return flag;

}