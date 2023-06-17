const inputBar = document.querySelector("#comment-input");
const rootDiv = document.querySelector("#comments");
const btn = document.querySelector("#submit");
const mainCommentCount = document.querySelector('#count'); //맨위 댓글 숫자 세는거.

//글로벌로 뺏음. 값을 저장하기 위해서.
let idOrVoteCountList=[];

//타임스템프 만들기
function generateTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const wDate = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const time = year+'-'+month+'-'+wDate+' '+hour+':'+min+':'+sec;
    return time;
}
// 엔터키 받기
inputBar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      pressBtn();
    }
  });

//유저이름 발생기
//유저이름은 8글자로 제한.
function generateUserName(){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var makeUsername = '';
    for(let i=0; i<4;i++){
        let index = Math.floor(Math.random(10) * alphabet.length);
        makeUsername += alphabet[index];        
    }
    for(let j=0;j<4;j++){
        makeUsername += "*";
    }
    return makeUsername;    
}

/* 추천 */
function numberCount(event){       
    console.log(event.target.parentNode.id);
    for(let i=0; i<idOrVoteCountList.length; i++){  
        if(event.target.className === "voteUp"){                       
            
           //event.target.parentNode.id 값이 string이기 때문에 이 값을 Number처리하던지, idOrVoteCountList[i]["commentId"]이 값을 string처리해야 넘어감.
           if(idOrVoteCountList[i]["commentId"].toString() === event.target.parentNode.id){                
               idOrVoteCountList[i]["voteUpCount"]++;               
               event.target.innerHTML = "👍"+idOrVoteCountList[i]["voteUpCount"];
           }       
         
         }else if(event.target.className === "voteDown"){
           if(idOrVoteCountList[i]["commentId"].toString() === event.target.parentNode.id){
               idOrVoteCountList[i]["voteDownCount"]++;
               event.target.innerHTML = "👎"+idOrVoteCountList[i]["voteDownCount"];              
         } 
       }

   } 
}

//기존에 남아있던 id초기화 및 새로추가된부분만 코멘트값 이어서 들어옴.
function initIdCount(){
    for(let i=0; i<idOrVoteCountList.length; i++){
      if(idOrVoteCountList[i]["commentId"] - i > 1){    
        idOrVoteCountList[i]["commentId"] =  idOrVoteCountList[i]["commentId"] - (idOrVoteCountList.length-(i+1));        
      }
    }
}

function deleteComments(){ 
    const btn = event.target;
    const list = btn.parentNode.parentNode;//commentList
    //삭제버튼도 마찬가지임. 여러개니깐 인식을 못함. 상위노드에 id 부여함.    
    //삭제버튼 클릭한 배열의 인덱스를 날리면 됨. 뭐 여기까지 해도 상관없는데...
    for(let i=0; i<idOrVoteCountList.length; i++){
        if(idOrVoteCountList[i]["commentId"].toString() === btn.parentNode.id){
            idOrVoteCountList.splice(btn.parentNode.id-1,1);   
        }

    }
    //그다음에 전체 지우기.
    rootDiv.removeChild(list);   

    //메인댓글 카운트 줄이기. 
    if(mainCommentCount.innerHTML <='0'){
        mainCommentCount.innerHTML = 0;        
    }else{
        mainCommentCount.innerHTML--; 
    }
}


//댓글보여주기
function showComment(comment){
    const userName = document.createElement('div');
    userName.className="name";
    userName.id = newId; //삭제,수정버튼의 상위노드. 
    //유저네임가져오기 
    userName.innerHTML = generateUserName();  

    //입력값 넘기기
    const inputValue = document.createElement('span');
    inputValue.className="inputValue";
    inputValue.innerText = comment;
    inputValue.id = newId;  //추가
    
    //타임스템프찍기
    const showTime = document.createElement('div');
    showTime.className="time";
    showTime.innerHTML = generateTime();

    const voteDiv = document.createElement('div');
    voteDiv.className="voteDiv";
    voteDiv.id = newId;

    const countSpan = document.createElement('span')
    countSpan.innerHTML=0;    

    const voteUp = document.createElement('button');
    voteUp.className ="voteUp";
    voteUp.innerHTML = "👍"+0;   
    
    const voteDown = document.createElement('button');  
    voteDown.className ="voteDown";     
    voteDown.innerHTML = "👎"+0;
    
    const commentList = document.createElement('div');  // 스코프 밖으로 나가는 순간 하나지우면 다 지워지고 입력하면 리스트 불러옴
    commentList.className = "eachComment";

    //수정버튼 만들기
    const modifyBtn = document.createElement('button');
    modifyBtn.className = 'modifyBtn';
    modifyBtn.innerHTML = "수정";
    
    //스페이서만들기
    const spacer = document.createElement('div');
    spacer.className = "spacer";

    const newId = idOrVoteCountList.length+1; //댓글하나에 달린 ID

    //삭제버튼 만들기
    const delBtn = document.createElement('button');
    delBtn.className ="deleteComment";
    delBtn.innerHTML="삭제";    
    
    
    userName.appendChild(spacer);
    userName.appendChild(modifyBtn);
    userName.appendChild(delBtn);  

    //투표창 만들기, css먼저 입혀야함.        
    voteDiv.appendChild(voteUp);
    voteDiv.appendChild(voteDown);
    
    //댓글뿌려주기       
    commentList.appendChild(userName);
    commentList.appendChild(inputValue);
    commentList.appendChild(showTime);
    commentList.appendChild(voteDiv);
    // rootDiv.prepend(commentList);
    rootDiv.appendChild(commentList)

    //아이디에 따른 투표수카운트. 배열에 접근해서 수정하는 방식으로 해야함.
    let IdAccordingToVoteCount = {
        "commentId" : newId,
        "voteUpCount" : 0,
        "voteDownCount" : 0,
        "commentValue" : comment   //추가
    }
    
    idOrVoteCountList.push(IdAccordingToVoteCount);
    console.log(idOrVoteCountList);
    
    initIdCount();
    
    voteUp.addEventListener("click",numberCount);
    voteDown.addEventListener("click",numberCount);
    delBtn.addEventListener("click",deleteComments);
    modifyBtn.addEventListener("click",modifyComments);

}





//버튼만들기+입력값 전달
function pressBtn(){ 

   const currentVal = inputBar.value;
   
   if(!currentVal.length){
      alert("댓글을 입력해주세요!!");
   }else{
      showComment(currentVal);  
      mainCommentCount.innerHTML++;
      inputBar.value ='';
   }
}

//수정창 모달로 만들기
function modifyComments(event) {
    const mBtn = event.target;
  
    // 모달창 만들기
    const modal = document.createElement('div');
    const modalOverlay = document.createElement('div');
    const modalContent = document.createElement('div');
    const cancelBtn = document.createElement('button');
    const okBtn = document.createElement('button');
    const input = document.createElement('input');
    const span = document.createElement('span');
    modal.className = "modal hidden";
    modalOverlay.className = "modal__overlay";
    modalContent.className = "modal__content";
    okBtn.id = "ok";
    okBtn.innerHTML = "수정";
    cancelBtn.id = "cancel";
    cancelBtn.innerHTML = "취소";
    input.id = "modifyVal";
    input.placeholder = "변경할 내용을 입력하세요";
    span.id = "inBtn";
  
    span.appendChild(okBtn);
    span.appendChild(cancelBtn);
    modalContent.appendChild(input);
    modalContent.appendChild(span);
    modal.appendChild(modalOverlay);
    modal.appendChild(modalContent);
    rootDiv.appendChild(modal);
  
    modal.classList.remove("hidden");
  
    cancelBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
    });
  
    okBtn.addEventListener("click", function (event) {
      console.dir(mBtn.parentNode.parentNode.children[1]);
  
      for (var i = 0; i < idOrVoteCountList.length; i++) {
        if (idOrVoteCountList[i]["commentId"].toString() === mBtn.parentNode.id) {
          idOrVoteCountList[i]["commentValue"] = input.value;
          // 수정버튼누르면 변경.
          mBtn.parentNode.parentNode.children[1].innerHTML = input.value;
          modal.classList.add("hidden");
        }
      }
    });
  
    // input 요소에 엔터 키 이벤트 추가
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        // 수정 버튼 클릭 이벤트와 동일한 동작 수행
        console.dir(mBtn.parentNode.parentNode.children[1]);
  
        for (var i = 0; i < idOrVoteCountList.length; i++) {
          if (idOrVoteCountList[i]["commentId"].toString() === mBtn.parentNode.id) {
            idOrVoteCountList[i]["commentValue"] = input.value;
            // 수정버튼누르면 변경.
            mBtn.parentNode.parentNode.children[1].innerHTML = input.value;
            modal.classList.add("hidden");
          }
        }
      }
    });
  }

btn.onclick = pressBtn;