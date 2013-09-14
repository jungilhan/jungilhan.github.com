define(['view/stageView', 'controller/game'], function(Stage, Game) {
  /** 
   * Stage 메뉴 시작 함수.
   */
  function start() {
    var mode = localStorage.getItem('mode');
    var highestMode = localStorage.getItem('highestMode');
    var highestStage = localStorage.getItem('highestStage');
    Stage.render({
      mode: mode, 
      highestMode: 
      highestMode, 
      highestStage: highestStage
    }, {
      onstage: onstage_,
      onback: onback_
    });
  }

  /** 
   * Stage 버튼 클릭 콜백 함수.
   * @param {String} mode 난이도 
   * @param {Number} stage 판을 의미(1, 2, 3...)
   * @return {Boolean} 해당 stage를 실행할 수 있는지 여부
   */
  function onstage_(mode, stage) {
    var highestMode = localStorage.getItem('highestMode');
    var highestStage = localStorage.getItem('highestStage');
    var isUnlocked = true;

    if (mode == 'easy' && 
      (highestMode == 'normal' || highestMode == 'hard')) {
      isUnlocked = true;

    } else if (mode == 'normal' && highestMode == 'hard') {
      isUnlocked = true;

    } else if (stage > highestStage) {
      console.log('Stage is locked!');
      isUnlocked = false;
    }

    if (isUnlocked) {
      Game.start(mode, stage);
    }

    return isUnlocked;
  }

  /** 
   * back 버튼 콜백 함수.
   */
  function onback_() {
    require(['controller/menu'], function(Menu){
      Menu.start();
    });
  }

  return {
    start: start
  };
});