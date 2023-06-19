export default class AddTeam{
    constructor() {
      document.title = 'AddTeam';
  
      this.selectCategory = '';
      this.base64Data = ''; // 공통 변수 선언
      this.isImage = false;
    }
  
    eventFunction() {
      this.convertImage();
      this.addTeam();
    }
  

    async getHtml() {
  
      return `
      <div class="container"> 
        <h2 class="page-title">Add a profile</h2>
        <a class="btn btn-primary" data-render="admin_team" data-index="" data-link>Back to all profile</a>
  
        <br><br><br>
  
        <form id="add-team-form" method="post">
          <div class="form-group">
            <label for="">이름</label>
            <input type="text" class="form-control" name="name" value="" placeholder="키미노 나마에와...">
          </div>
  
            <div class="form-group">
              <label for="">학급</label>
                <select name="class" class="form-control">
                    <option value="3WD">3WD</option>
                    <option value="3CP">3CP</option>
                    <option value="2WD">2WD</option>
                    <option value="2CP">2CP</option>
                    <option value="J1">J1</option>
                    <option value="J2">J2</option>
                </select>
            </div>
  
          <div class="form-group">
            <label for="">각오</label>
            <textarea name="minded" class="form-control" cols="30" rows="10" placeholder="말해"></textarea>
          </div>
  
          <div class="form-group">
            <label for="">일본어 수준</label>
            <select name="level" class="form-control">
                <option value="N1">N1</option>
                <option value="N2">N2</option>
                <option value="N3">N3</option>
                <option value="N4">N4</option>
                <option value="N5">N5</option>
                <option value="X">X</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="">나이</label>
            <input type="text" class="form-control" name="age" value="" placeholder="몇짤">
          </div>
  
          <div class="form-group">
            <label for="">인증사진</label>
            <input type="file" class="form-control" name="image" id="img">
            <img src="#" id="imgPreview" alt="">
          </div>
  
          <button class="btn btn-default" data-render="admin_team" data-index="">Submit</button>
        </form>
        </div>
      `;
    }
  
    addTeam() {
      const form = document.getElementById('add-team-form');
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
       
        await fetch('/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
              name: formData.get('name'),
              class: formData.get('class'),
              minded: formData.get('minded'),
              level: formData.get('category'),
              age: formData.get('age'),
              imgUrl: this.base64Data // 공통 변수 사용
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