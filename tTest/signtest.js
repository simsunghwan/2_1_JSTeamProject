
const $signUp = document.getElementById("sign-up");
const $sign_error = document.querySelector(".sign_error");
const $sign_success = document.querySelector(".sign_success");


let idFlag = false; 

//새로고침 막는 코드
const form = document.querySelector('#signUp');
form.addEventListener('submit',(e) => { 
  e.preventDefault();
})

//회원가입 버튼 클릭시 태그 나옴
const $signUpBtn = document.querySelector('#signUpBtn');
$signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const $showBox = document.getElementById("signBox");
  $showBox.classList.replace('hidden', 'show');
  
})

async function checkId(user) {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  let idData = Array.from(data);
  // console.log(idData);

  for (const id of idData) {
    // console.log(typeof user.userId);
    // console.log(typeof id);
    if (id.userId === user.userId) {
      idFlag = true;
      break;
    }
  }
  return;
}
async function postUser(user) {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
}


$signUp.addEventListener('click', async (e) => {
  e.preventDefault();
  $sign_error.textContent = "";
  console.log('sub');

  const user = {
    "userId": "",
    "password": "",
    "name": "",
    "nickName": "",
    "phone": "",
    "birth": ""
  };

  const userIdInput = document.querySelector("#userIdInput");
  const passwordInput = document.querySelector("#passwordInput");
  const nameInput = document.querySelector("#nameInput");
  const birthInput = document.querySelector("#birthInput");
  const pwCheck = document.querySelector("#pwCheck");


  user.userId = userIdInput.value;
  user.password = passwordInput.value;
  user.name = nameInput.value;
  user.nickName = nickNameInput.value;
  user.phone = phoneInput.value;
  user.birth = birthInput.value;

  
  if (user.userId === "") {
    $sign_error.textContent = "아이디가 비어있습니다. 모든 정보를 입력하시오";
    return;
  }
  if (user.password === "") {
    $sign_error.textContent = "비밀번호가 비어있습니다. 모든 정보를 입력하시오";
    return;
  }
  if (pwCheck.value === "") {
    $sign_error.textContent = "비밀번호 확인이 비어있습니다. 모든 정보를 입력하시오";
    return;
  }
  if (user.password !== pwCheck.value) {
    $sign_error.textContent = "비밀번호가 다릅니다";
    return;
  }
  if (user.name === "") {
    $sign_error.textContent = "이름이 비어있습니다. 모든 정보를 입력하시오";
    return;
  }
  if (user.nickName === "") {
    $sign_error.textContent = "닉네임이 비어있습니다. 모든 정보를 입력하시오";
    return;
  }
  if (user.phone === "") {
    $sign_error.textContent = "전화번호가 비어있습니다. 모든 정보를 입력하시오";
    return;
  }
  if (user.birth === "") {
    $sign_error.textContent = "생일이 비어있습니다. 모든 정보를 입력하시오";
    return;
  }
  idFlag = false;
  checkId(user.userId);
  if (idFlag === true) {
    $sign_error.textContent = "중복된 아이디입니다.";
    return;
  }


  await postUser(user);
  $sign_success.textContent = "회원가입이 완료되었습니다";

  
  
 
  //입력칸 비우기
  // userIdInput.value = "";
  // passwordInput.value = "";
  // nameInput.value = "";
  // nickNameInput.value = "";
  // phoneInput.value = "";
  // birthInput.value = "";

  

  
})