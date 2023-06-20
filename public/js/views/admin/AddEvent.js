export default class AddEvent{
    constructor() {
      document.title = 'AddEvent';
  
      this.selectCategory = '';
      this.base64Data = ''; // 공통 변수 선언
      this.isImage = false;
    }
  
    eventFunction() {
      this.convertImage();
      this.addEvent();
    }

    async getHtml() {
  
      return `
      <div class="container"> 
        <h2 class="page-title">Add a Event</h2>
        <a class="btn btn-primary" data-render="admin_event" data-index="" data-link>Back to all Event</a>
  
        <br><br><br>
  
        <form id="add-event-form" method="post">
          <div class="form-group">
            <label for="">행사명</label>
            <input type="text" class="form-control" name="name" value="" placeholder="마츠리 나마에">
          </div>
  
          <div class="form-group">
            <label for="">행사 내용</label>
            <textarea name="desc" class="form-control" cols="30" rows="10" placeholder="행사 세부 내용"></textarea>
          </div>
  
          <div class="form-group">
            <label for="">배너 사진</label>
            <input type="file" class="form-control" name="image" id="img">
            <img src="#" id="imgPreview" alt="">
          </div>
  
          <button class="btn btn-default" data-render="admin_event" data-index="">Submit</button>
        </form>
        </div>
      `;
    }
  
    addEvent() {
      const form = document.getElementById('add-event-form');
      form.addEventListener('submit', async (e) => {
        console.log('form 작동');
        e.preventDefault(); // 기본 제출 동작 방지
  
        // 검증
  
        // 올바른 이미지 형식임.
        if (this.isImage) {
          console.log('isImage', this.isImage);
        }
  
        //////////////////////////////////////////////////////////
  
        const formData = new FormData(form);
       
        await fetch('/event', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
              name: formData.get('name'),
              desc: formData.get('desc'),
              image: this.base64Data // 공통 변수 사용
            })
          });
      });
    }
  
    convertImage() {
      const inputImage = document.getElementById('img');
      const preview = document.getElementById('imgPreview');
      const self = this;
  
      inputImage.addEventListener('input', (e) => {
          const selectedFile = document.getElementById("img").files[0];
  
          const dotIndex = selectedFile.name.lastIndexOf('.');
          const fileExt = selectedFile.name.substring(dotIndex, selectedFile.name.length).toLowerCase();
  
          const imageExt = ['.jpg', '.jpeg', '.png', '.webp'];
  
          imageExt.forEach(ext => {
            if (ext === fileExt) {
              self.isImage = true;
  
              let reader = new FileReader();
  
              reader.onload = function(e) {
                preview.setAttribute('src', e.target.result);
                preview.setAttribute('width', 100);
                preview.setAttribute('height', 100); 
       
                self.base64Data = e.target.result;
               }
       
             reader.readAsDataURL(selectedFile);
            }
          }) 
      }); 
    }
  }