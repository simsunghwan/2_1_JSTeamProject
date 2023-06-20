export default class AdminEvent {
    constructor() {
      document.title = 'AdminEvent';
    }
  
    async getHtml() {
      
      const response = await fetch("/event");
      const data = await response.json(); 
  
      const tableRows = data.map(event => {
        return `
          <tr>
              <td>${event.name}</td>
              <td><a data-render="edit_event" data-index="${event.id}" data-link>Edit</a></td>
              <td><a class="btn-delete" data-render="admin_event" data-index="${event.id}" data-link>Delete</a></td>
          </tr>
        `;
        }).join("");
  
        return `
          <div class="container">
            <h2 class="page-title">이벤트 목록 관리</h2>
            <a class="btn btn-primary" id="btn" data-render="add_event" data-index="" data-link>새 이벤트 등록</a>
            
            <br><br><br>
  
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>행사명</th>
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
            const eventId = element.dataset.index;
            await fetch('/event/' + eventId, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json'}
            });   
          }
        });
      });
    }
  }  