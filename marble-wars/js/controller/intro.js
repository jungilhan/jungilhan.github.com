define(['view/introView'], function(Intro) {
  /** 
   * 인트로 시작 함수.
   */
  function start() {
    Intro.render(oncomplete_);
  }

  /** 
   * 인트로 애니메이션 종료 콜백 함수.
   */
  function oncomplete_() {
    require(['controller/menu'], function(Menu) {
      Menu.start();
    });
  }

  return {
  	start: start
  };
});