import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Intro");
  }

  async pageFunction() {

    const response = await fetch("/profile");

    const data = await response.json();
    let profileData = Array.from(data);
    this.introSlide(profileData.length);
  }
  async getHtml() {
    const response = await fetch("/profile");

    const data = await response.json();
    let profileData = Array.from(data);
    const h = [];
    let upLoadPhoto = 0;

    for (const profile of data) {
      const imageTag = `<img alt="non" src="${profile.imgUrl}">`;
      const isImageLoaded =
        profile.imgUrl &&
        (profile.imgUrl.startsWith("http") ||
          profile.imgUrl.startsWith("data:image"));

      if (!isImageLoaded) {
        upLoadimgUrl += 1;
        continue;
      }

      h.push(`<div class="slide-box">`);
      h.push(`<table class="table table-dark table-striped">`);
      h.push(`<tbody>`);
      h.push(`<tr>`);
      h.push(`<td rowspan="5" class="text-center"><img alt="non" src="${profile.imgUrl}"></td>`);
      h.push(`<td>이름 :</td><td>${profile.name}</td>`);
      h.push(`</tr>`);
      h.push(`<tr>`);
      h.push(`<td>나이 :</td><td>${profile.age}</td>`);
      h.push(`</tr>`);
      h.push(`<tr>`);
      h.push(`<td>전공 :</td><td>${profile.class}</td>`);
      h.push(`</tr>`);
      h.push(`<tr>`);
      h.push(`<td>JLPT :</td><td>${profile.level}</td>`);
      h.push(`</tr>`);
      h.push(`<tr>`);
      h.push(`<td>각오 :</td><td>${profile.minded}</td>`);
      h.push(`</tr>`);
      h.push(`</tbody>`);
      h.push(`</table>`);
      h.push(`</div>`);
    }

    

    return `
      <!-- 조원 소개 -->
        
      <div id="intro" style="overflow: hidden;">
        <div>
          <h2 class="intro-title">조원소개</h2>
          <br><br><br>
        </div>

        <div id="sc" class="slide-container">
          ${h.join("")}
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
          slideContainer.style.transform = `translateX(-${nowPhoto*80}vw)`;
          nowPhoto += 1;
        } else {
          slideContainer.style.transform = `translateX(0vw)`;
          nowPhoto = 1;
        }
      });

      // 이전 버튼
      beforeButton.addEventListener("click", function () {
        if (nowPhoto > 1) {
          slideContainer.style.transform = `translateX(-${(nowPhoto - 2)*80}vw)`;
          nowPhoto -= 1;
        } else {
          slideContainer.style.transform = `translateX(-${(maxPhoto - 1)*80}vw)`;
          nowPhoto = maxPhoto;
        }
      });
    
  }
}