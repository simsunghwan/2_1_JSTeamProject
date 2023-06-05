// 소개 띄우기
function getData(){
introSlide();
fetch("http://localhost:3000/profile")
.then((response) => response.json())
.then((json) => {
    const h = [];
    let upLoadPhoto=0;
    for(const profile of json) {
        
    const imageTag = `<img alt="non" src="${profile.imgUrl}">`;
    // url image 로딩 방식과 base64 이미지 로딩 방식 모두 구현
    const isImageLoaded = profile.imgUrl && (profile.imgUrl.startsWith('http') || profile.imgUrl.startsWith('data:image')); // 이미지 로딩 여부를 체크하는 조건 추가

    if (!isImageLoaded) {
        upLoadimgUrl+=1;
        continue; // 이미지가 로딩되지 않은 경우, 현재 고객을 건너뜁니다.
    }
        h.push(`<div class="slide-box">`);
        h.push(`<table>`);
        h.push(`<tbody>`);

        h.push(`<tr>`);
        h.push(`<td rowspan="5"><img alt="non" src="${profile.imgUrl}"></td>`);
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
    const maxPhoto = (h.length/22);
    introSlide(maxPhoto);
    console.log(maxPhoto);
    document.getElementById("sc").innerHTML = h.join("");
})
}




const introSlide = (maxPhoto) =>{
    // 슬라이드 버튼 (다음, 이전)
    var nowPhoto = 1;
    var maxPhoto = maxPhoto;
    // 다음 버튼
    document.querySelector('.next').addEventListener('click', function(){
      if(nowPhoto < maxPhoto) {
          document.querySelector('.slide-container').style.transform = `translateX(-${nowPhoto}00vw)`;
          nowPhoto += 1;
      } else {
          document.querySelector('.slide-container').style.transform = `translateX(0vw)`;
          nowPhoto = 1;
      }
    });
    // 이전버튼
    document.querySelector('.before').addEventListener('click', function(){
      if (nowPhoto > 1 ) {
          document.querySelector('.slide-container').style.transform = `translateX(-${nowPhoto-2}00vw)`;
          nowPhoto -= 1;
      } else {
          document.querySelector('.slide-container').style.transform = `translateX(-${maxPhoto-1}00vw)`;
          nowPhoto = maxPhoto;
      }
    });
    }