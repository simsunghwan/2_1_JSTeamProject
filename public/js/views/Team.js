export default class Team {
  constructor() {
    document.title = 'Team';
  }

  async eventFunction() {
    const response = await fetch("/profile");

    const data = await response.json();
    let profileData = Array.from(data);
    this.introSlide(profileData.length);

    console.log("complete1");
  }

  async getHtml() {
    console.log("complete1");
    const resProduct = await fetch("/profile");
    const dataProduct = await resProduct.json(); 

    const productRows = dataProduct.map(profile => {



      return `
      <div class="slide-box">
        <table class="table table-striped table-wrapper">
          <tbody class="table-row table-cell table-dark">
            <tr>
              <td rowspan="4" class="text-center">
                <img alt="non" src="${profile.imgUrl}" >
              </td>
              <td>이름 :</td><td>${profile.name}</td>
            </tr>
            <tr>
              <td>나이 :</td><td>${profile.age}</td>
            </tr>
            <tr>
              <td>전공 :</td><td>${profile.class}</td>
            </tr>
            <tr>
              <td>JLPT :</td><td>${profile.level}</td>
            </tr>
            <tr>
              <td colspan="3">앞으로의 다짐
              <hr><p class="psize">
              ${profile.minded}
              </p>
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>
      `;
    }).join("");
    console.log("complete2");
    

    return `
      <!-- 조원 소개 -->
        
      <div class='container' id="intro" style="overflow: hidden;">
        <div>
          <h2 class="intro-title">조원소개</h2>
          <br><br><br>
        </div>

        <div id="sc" class="slide-container">
          ${productRows}
        </div>

        <div>
          <button class="before" id="before">◀</button>
          <button class="next" id="next">▶</button>
        </div>
      </div>
    `;
  }

  introSlide(maxPhoto) {
    // 슬라이드 버튼 (다음, 이전)
    let nowPhoto = 1;
    const slideContainer = document.querySelector(".slide-container");
    const nextButton = document.querySelector(".next");
    const beforeButton = document.querySelector(".before");
    console.log();
    
      // 다음 버튼
      nextButton.addEventListener("click", function () {
        if (nowPhoto < maxPhoto) {
          slideContainer.style.transform = `translateX(-${nowPhoto}00vw)`;
          nowPhoto += 1;
        } else {
          slideContainer.style.transform = `translateX(0vw)`;
          nowPhoto = 1;
        }
      });

      // 이전 버튼
      beforeButton.addEventListener("click", function () {
        if (nowPhoto > 1) {
          slideContainer.style.transform = `translateX(-${(nowPhoto - 2)}00vw)`;
          nowPhoto -= 1;
        } else {
          slideContainer.style.transform = `translateX(-${(maxPhoto - 1)}00vw)`;
          nowPhoto = maxPhoto;
        }
      });
    
  }

}