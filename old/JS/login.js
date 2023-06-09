class login extends HTMLElement {
    constructor() { 
        super();
    
        this.currentOffset = 0;
        

    this.innerHTML =
    `
    <div id="login" class="show">
        <div class="login_form">
        <div>
            <h4>Login</h4>
            <input onkeyup = "setId()" type="text" name="user_name" id="input_login"></input>
            <input type="password" name="password" id="input_pw"></input>
        </div>
        <div class="btn">
            <button onclick = "login()" id="loginBtn">login</button>
            <button id="signUpBtn">sign Up</button>
        </div>
    </div>
    `

        const input = document.querySelector('#input_pw')
        input.addEventListener('click', () => {
            this.asdasd();
        })

    }

    asdasd() {
        
    }


}