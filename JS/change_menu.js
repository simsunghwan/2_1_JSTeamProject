// 메뉴 를 눌렀을 때 section 부분 숨김(hide)/보임(show) 처리 하는 곳입니다.


    // 메인 화면 표시
    // 현재 테스트로 게시판이 기본화면입니다. 
    // 조원 소개 창으로 바꾸어 주세요
    function defaultDisplay() {
      console.log("success");
      $intro.className = 'hide';
      $board.className = 'hide';
      $login.className = 'show';
      // $cdialog.className = 'hide';
      // $mdialog.className = 'hide';
      // $ddialog.className = 'hide';
      // $boardContent.className = 'hide';
    }

    function vIntro() {
      $intro.className = 'show';
      $login.className = 'show';
      $board.className = 'hide';
      introSlide();
      getData();
    }

    // 게시판 창으로 변환
    function vBoard() {
      console.log("success");
      $board.className = 'show';
      $login.className = 'show';
      $intro.className = 'hide';
    }