export default class EditEvent {
    constructor() {
      document.title = 'EditEvent';
      this.index = document.querySelector('main-admin-element').dataset.index;
      this.selectedFile;
      this.base64Data = "";
    }
  
    eventFunction() {
      this.convertImage();
      this.editEvent();
    }
    async getHtml() {
      const resEvent = await fetch("event");
      const dataEvent = await resEvent.json(); 
  
      const self = this;
  
      let name = "";
      let desc = "";
      let image = "";
      let curImage = "";

  
      dataEvent.forEach(event => {
        if (event.id === parseInt(self.index)) {
            name = event.name;
            desc = event.desc;
            image = event.image;
        }
      });
  
      if (image === '') {
        curImage = `<img id="curImage" src="/images/noimage.png" width=100 height=100 alt="">`
      }
      else {
        curImage = `<img id="curImage" src="${image}" width=100 height=100 alt="">`
      }
  
      return `
      <div class="container">
        <h2 class="page-title">Edit a Event</h2>
        <a class="btn btn-primary" data-render="admin_event" data-index="" data-link>Back to all Event</a>
  
        <br><br><br>
  
        <form id="edit-event-form" method="post">
  
          <div class="form-group">
            <label for="">행사명</label>
            <input type="text" class="form-control" name="name" value="${name}" placeholder="event name">
          </div>
  
          <div class="form-group">
            <label for="">행사 내용</label>
            <textarea name="desc" class="form-control" cols="30" rows="10" placeholder="행사 세부 내용">${desc}</textarea>
          </div>
  
          <div class="form-group">
            <label for="">Current Image</label>
            <p>
              ${curImage}
            </p>
          </div>
   
          <div class="form-group">
            <label for="">Upload Image</label>
            <input type="file" class="form-control" name="image" id="img">
            <img src="#" id="imgPreview" alt="">
          </div>
  
          <!-- <input type="hidden" name="pimage" value="$image here"> -->
          <button class="btn btn-default" data-render="admin_event" data-index="">Submit</button>
        </form>
  
        <!-- 다중 이미지 삽입은 일단 스킵 -->
        </div>
      `;
    }
  
    editEvent() {
      const form = document.getElementById('edit-event-form');
      const self = this;
  
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // 기본 제출 동작 방지
  
        // 이미지 새로 바꾸지 않으면 현재 이미지 저장 구현해야 함
  
        const formData = new FormData(form);
  
        // 파일을 선택하지 않으면
        if (self.selectedFile === undefined) {
          console.log('파일 미선택');
          self.base64Data = document.getElementById('curImage').src;
        }
  
        const eventId = self.index;
       
          await fetch('/event/' + eventId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
              name: formData.get('name'),
              desc: formData.get('desc'),
              image: this.base64Data 
            })
          });
      });
    }
  
    convertImage() {
      const inputImage = document.getElementById('img');
      const preview = document.getElementById('imgPreview');
      const self = this;
  
      inputImage.addEventListener('input', (e) => {
        self.selectedFile = document.getElementById("img").files[0];
  
          const dotIndex = self.selectedFile.name.lastIndexOf('.');
          const fileExt = self.selectedFile.name.substring(dotIndex, self.selectedFile.name.length).toLowerCase();
  
          const imageExt = ['.jpg', '.jpeg', '.png', '.webp'];
  
          imageExt.forEach(ext => {
            if (ext === fileExt) {
              let reader = new FileReader();
  
              reader.onload = function(e) {
                preview.setAttribute('src', e.target.result);
                preview.setAttribute('width', 100);
                preview.setAttribute('height', 100); 
       
                self.base64Data = e.target.result;
               }
               
             reader.readAsDataURL(self.selectedFile);
            }
          }) 
      }); 
    }
  }