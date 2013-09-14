define(['controller/intro', 'controller/audio', 'jquery', 'lib/collie'], function(Intro, Audio, $) {
  /** 
   * Application 시작 함수.
   */
  function start() {    
    prepareResource_();
  }

  /** 
   * 게임에서 사용하는 모든 이미지 리소스 등록
   */
  function prepareResource_() {
    //console.time('prepareResource_()');
    collie.ImageManager.add({
      // 공통 
      background: 'img/background.png',
      dimBackground: 'img/dim.png',

      // 인트로
      introCopyright: 'img/copyright-e.png',
      introTitle: 'img/intro-title-e.png',
      introMarbleSmall: 'img/marble-small.png',
      introMarbleLarge: 'img/marble-large.png',

      // 메뉴
      menuTitle: 'img/title-e.png',
      menuRule: 'img/game-rule-e.png',
      menuSettings: 'img/settings-e.png',  
      menuScrollArea: 'img/scroll-area.png',
      menuEasy: 'img/menu-easy.png',
      menuNormal: 'img/menu-normal.png',
      menuHard: 'img/menu-hard.png',
      menuNormalLock: 'img/menu-normal-lock.png',
      menuHardLock: 'img/menu-hard-lock.png',
      menuRule1: 'img/rule1-e.png',
      menuRule2: 'img/rule2-e.png',
      menuRule3: 'img/rule3-e.png',
      menuSettingsBg: 'img/settings-background.png',
      menuSettingsSoundOn: 'img/settings-sound-on.png',
      menuSettingsSoundOff: 'img/settings-sound-off.png',

      // 세부 메뉴 
      stageBackground: 'img/mini-background-e.png',
      stageBack: 'img/mini-backbutton.png',
      stageEasy: 'img/mini-easy.png',
      stageNormal: 'img/mini-normal.png',
      stageHard: 'img/mini-hard.png',
      stage: 'img/stage-back.png',
      stage0: 'img/0.png',
      stage1: 'img/1.png',
      stage2: 'img/2.png',
      stage3: 'img/3.png',
      stage4: 'img/4.png',
      stage5: 'img/5.png',
      stage6: 'img/6.png',
      stage7: 'img/7.png',
      stage8: 'img/8.png',
      stage9: 'img/9.png',
      stageLock: 'img/stage-lock.png',

      // 게임 화면
      gameBackground: 'img/game-background.png',
      gameMarble: 'img/marble.png',
      gameGoNormal: 'img/go.png',
      gameGoDown: 'img/go-down.png',
      gameAgain: 'img/regame-e.png',
      gameEasy: 'img/game-easy.png',
      gameNormal: 'img/game-normal.png',
      gameHard: 'img/game-hard.png',
      gameWinPopupBg: 'img/win-back.png',
      gameLosePopupBg: 'img/lose-back.png',
      gameNextStage: 'img/next-stage-e.png',
      gameWinPopupAgain: 'img/again-small-e.png',
      gameLosePopupAgain: 'img/again-big-e.png',

    }, function () {
      //console.timeEnd('prepareResource_()');
      $('#loading').hide();
      Audio.init();
      Intro.start();
    });
  }

  return {
    start: start
  };
});