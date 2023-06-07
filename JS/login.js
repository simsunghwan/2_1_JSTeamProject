$input_login = document.querySelector("#input_login");
$input_pw    = document.querySelector("#input_pw");


function login() {
    
    if( $input_login.value === null) {
        alert("ID를 입력해주세요");
    } else if($input_pw.value === null) {
        alert("PW를 입력해주세요");
    }
    
}