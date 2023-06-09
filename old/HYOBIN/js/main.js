

//변수 생성
const postReviewBtn = document.querySelector(".review_upload");
const addReview = document.querySelector('.input_review');
const newReview = document.querySelector('.comment');
const commenter = ['uuu', 'pdds','hooe','ddwwe'];  //db연결대신 배열로 선언


//게시 버튼 클릭시 댓글 추가
function uploadReview(){
    if(addReview.value.length > 0){
        const newComment = document.createElement("li");
        const deleteBtn = document.createElement('removeComment');
        const likeBtn = document.createElement('likeHeart');
        const commentervalue = Math.floor(Math.random() * commenter.length); //배열 길이만큼 무작위로 값을 생성
        const commenterPick = commenter[commentervalue];//무작위로 생성된 값을 고르도록
        newComment.innerHTML =  commenterPick + " " + addReview.value ;
        newReview.appendChild(newComment);
        newReview.style.fontSize ='small';
        likeBtn.innerHTML='<i class="xi-heart-o"></i>';
        newComment.appendChild(likeBtn);
        likeBtn.style.cursor ='pointer';
        likeBtn.style.float='right';
        likeBtn.style.marginLeft='-0.9rem';
        likeBtn.style.marginRight='0.8rem';
        likeBtn.addEventListener("click", pushHeart);
        deleteBtn.innerHTML='<i class="xi-trash-o"></i>';
        newComment.appendChild(deleteBtn);
        deleteBtn.style.cursor='pointer';
        deleteBtn.style.float='right';
        deleteBtn.addEventListener("click", removeComm);
        addReview.value="";
        addReview.focus();

        //댓글 좋아요
        function pushHeart(){
            if(likeBtn !== 0){
                likeBtn.innerHTML='<i class="xi-heart"></i>';
                likeBtn.style.color ='red';
            }else{
                likeBtn.innerHTML='';
            }
        }
        //댓글 삭제
        function removeComm(){
            newComment.remove();
        }

    }else{
        alert('댓글을 입력해 주세요');
    }
    postReviewBtn.style.color = "rgb(199, 235, 245)"; //댓글추가후 게시버튼 누르면 버튼색상 다시 초기화
}

//엔터키로 댓글 추가
addReview.addEventListener("keypress",(e) => {//현재는 keypress를 지양한다고 하니 사용하지말자!
        if(addReview.value.length !== 0){
        uploadReview();
        }
    }
);

//댓글 입력창에 입력이 될 경우에 버튼 활성화
function inputReview(){
    if(addReview.value.length>0){
        postReviewBtn.style.color = "rgb(11, 159, 228)";
    }else{
        postReviewBtn.style.color = "rgb(199, 235, 245)";
    }
}
