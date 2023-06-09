// 월과 일이 10 보다 작다면 0을 앞에 붙여서 출력
function leftPad(value) {
  if(value >= 10){
    return value;
  }

  return `0${value}`;
}

// 게시판 작성 일자의 기본포맷을 yyyy.mm.dd 로 지정
function toStringByFormatting(source, delimiter = '.'){
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

// 작성 시 동작
const postData = (e) => {
  e.preventDefault(); // 기본적인 이벤트 제거
  const data = {
    title: e.target.title.value,
    writer: e.target.writer.value,
    content: e.target.content.value,
    createdAt: toStringByFormatting(new Date()), // 작성일을 기본포맷을 변경하여 json형태로 저장
    hit: 0
  };
  //const data = { title: "fetch api111", writer: "john한" };
  fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(data),
    //body: data,
    headers: headers = {
      "content-type": "application/json;charset=UTF-8"
    },
  }).then((response) => response.json()).then((json) => console.log(json));
  e.target.title.value = '';    // 제목 칸에 쓰여진 내용을 가져옴
  e.target.writer.value = '';   // 작성자 칸에 쓰여진 내용을 가져옴
  e.target.content.value = '';  // 내용 칸에 쓰여진 글을 가져옴
  defaultDisplay();
  getPosts(e);
};


