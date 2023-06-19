export default class DeleteAdmin{
  constructor() {
    document.title = "DeleteAdmin";
    this.index = document.querySelector('main-element').dataset.index;
  }

  eventFunction() {
    this.deleteAdmin();
  }

  getHtml() {
    return `
      
    <div class='container'>
      <h1>Login</h1>
      <form id="deleteAdmin-form" method="post">
        <div class="form-group">
          <label>삭제할 아이디:</label>
          <input type="text" name="userid" class="form-control" placeholder="UserID">
        </div>
        <div class="error_message" style="color:red"> </div>
        <button class="btn btn-default data-index="">Submit</button>
      </form>
        
    </div>


      `;
  }

  
  deleteAdmin() {
    const form = document.getElementById('deleteAdmin-form');
    const mainElement = document.querySelector('main-element');

    form.addEventListener('submit', async (e) => {
      console.log('form 작동');
      e.preventDefault(); // 기본 제출 동작 방지
      const $errorMessage = document.querySelector('.error_message');
      const response = await fetch("/user");
      const data = await response.json(); 

      const formData = new FormData(form);
  
      const user = data.find(user => 
        user.userid === formData.get('userid')
      );
      if (!user) {
        $errorMessage.textContent = '해당 아이디를 가진 유저가 없습니다.';
        return;
      }
      await fetch(`/user/${user.id}`, {
        method: "DELETE",
      });
      $errorMessage.textContent = "";
      alert("사용자 정보가 삭제되었습니다.");
      mainElement.setAttribute('data-render', 'deleteAdmin');



    });
  }
}
