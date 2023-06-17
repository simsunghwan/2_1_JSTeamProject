const $signUpBox = document.querySelector('#signUpBox');
const signUp = document.getElementById('signup');
signUp.addEventListener('click', handleSignup);

async function handleSignup(event) {
  event.preventDefault(); // 폼 제출 기본 동작 막기
console.log("hi");
  // 입력된 데이터 가져오기
  const name = document.getElementById('name').value;
  const userId = document.getElementById('userId').value;
  const userPW = document.getElementById('password').value;
  const nickName = document.getElementById('nickName').value;
  const birth = document.getElementById('birth').value;
  const phone = document.getElementById('phone').value;
  // 가져온 데이터로 회원가입 요청 보내기

  
  const userData = {
    name: name,
    userId: userId,
    userPW: userPW,
    nickName: nickName,
    birth: birth,
    phone: phone
  };


    createUser(userData);
}

function createUser(user) {
  const res = fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

}


