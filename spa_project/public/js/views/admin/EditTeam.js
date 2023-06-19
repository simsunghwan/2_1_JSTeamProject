export default class EditTeam {
    constructor() {
      document.title = 'EditTeam';
      this.index = document.querySelector('main-admin-element').dataset.index;
      this.selectedFile;
      this.base64Data = "";
    }
  
    eventFunction() {
      this.convertImage();
      this.editProfile();
    }
  // category 내용은 삭제
    async getHtml() {
      console.log("comple");
      const resProfile = await fetch("profile");
      const dataProfile = await resProfile.json(); 
  
      const self = this;
  
      let name = "";
      let classA = "";
      let minded = "";
      let age = "";
      let level = "";
      let image = "";
  
      let curImage = "";

  
      dataProfile.forEach(profile => {
        if (profile.id === parseInt(self.index)) {
            name = profile.name;
            classA = profile.class;
            minded = profile.minded;
            age = profile.age;
            level = profile.level;
            image = profile.imgUrl;
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
        <h2 class="page-title">Edit a profile</h2>
        <a class="btn btn-primary" data-render="admin_team" data-index="" data-link>Back to all profile</a>
  
        <br><br><br>
  
        <form id="edit-profile-form" method="post">
  
          <div class="form-group">
            <label for="">이름</label>
            <input type="text" class="form-control" name="name" value="${name}" placeholder="name">
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
            <textarea name="minded" class="form-control" cols="30" rows="10" placeholder="각오">${minded}</textarea>
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
            <input type="text" class="form-control" name="age" value="${age}" placeholder="몇짤">
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
          <button class="btn btn-default" data-render="admin_team" data-index="">Submit</button>
        </form>
  
        <!-- 다중 이미지 삽입은 일단 스킵 -->
        </div>
      `;
    }
  
    editProfile() {
      const form = document.getElementById('edit-profile-form');
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
  
        const profileId = self.index;
       
          await fetch('/profile/' + profileId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
              name: formData.get('name'),
              class: formData.get('class'),
              minded: formData.get('minded'),
              level: formData.get('level'),
              age: formData.get('age'),
              imgUrl: this.base64Data 
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