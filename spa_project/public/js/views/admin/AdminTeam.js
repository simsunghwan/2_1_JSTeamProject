export default class AdminTeam {
    constructor() {
      document.title = 'AdminTeam';
    }
  
    async getHtml() {
      
      const response = await fetch("/profile");
      const data = await response.json(); 
  
      const tableRows = data.map(profile => {
        return `
          <tr>
              <td>${profile.name}</td>
              <td><a data-render="edit_team" data-index="${profile.id}" data-link>Edit</a></td>
              <td><a class="btn-delete" data-render="admin_team" data-index="${profile.id}" data-link>Delete</a></td>
          </tr>
        `;
        }).join("");
  
        return `
          <div class="container">
            <h2 class="page-title">조원 등록 관리</h2>
            <a class="btn btn-primary" id="btn" data-render="add_team" data-index="" data-link>새 멤버 영입</a>
            
            <br><br><br>
  
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>
        `;
    }
  
    eventFunction() {
      const deleteBtn = document.querySelectorAll('.btn-delete');
      // 모든 버튼 마다 이벤트를 추가
      deleteBtn.forEach((element) => {
        element.addEventListener("click", async () => {
  
          const checkDelete = confirm("삭제하시겠습니까?");
          
          if (checkDelete) {
            const profileId = element.dataset.index;
            await fetch('/profile/' + profileId, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json'}
            });   
          }
        });
      });
    }
  }  