define(['view/menuView', 'controller/stage', 'controller/audio', 'model/effects', 'controller/login'], function(Menu, Stage, Audio, Effects, Login) {
  /** 
   * 메뉴 시작 함수.
   */
  function start() {
    var mode = localStorage.getItem('mode');
    if (mode == null) {
      mode = 'easy';
      localStorage.mode = mode;
      //localStorage.stage = 1;
    }

    var highestStage = localStorage.getItem('highestStage');
    if (highestStage == null) {
      localStorage.highestStage = 1;
    }

    var highestMode = localStorage.getItem('highestMode');
    if (highestMode == null) {
      localStorage.highestMode = 'easy';
    }

    var effects = Effects.isEnabled();

    Menu.render({
      highestStage: highestStage, 
      highestMode: highestMode,
      effects: effects
    }, {
      oneasy: oneasy_,
      onnormal: onnormal_, 
      onhard: onhard_,
      oneffects: oneffects_,
      onlogin: onlogin_
    });
  }

  /** 
   * Easy 게임 버튼 콜백 함수.
   */
  function oneasy_() {
    //Audio.playButton();

    localStorage.mode = 'easy';
    Stage.start();
  }

  /** 
   * Normal 게임 버튼 콜백 함수.
   */
  function onnormal_() {    
    var highestMode = localStorage.getItem('highestMode');
    var isUnlocked = true;

    if (highestMode == 'easy') {
      console.log('Mode is locked!');
      isUnlocked = false;
    }
    
    if (isUnlocked) {
      //Audio.playButton();

      localStorage.mode = 'normal';
      Stage.start();
    }

    return isUnlocked;
  }

  /** 
   * Hard 게임 버튼 콜백 함수.
   */
  function onhard_() {    
    var highestMode = localStorage.getItem('highestMode');
    var isUnlocked = true;

    if (highestMode == 'easy' || highestMode == 'normal') {
      console.log('Mode is locked!');
      isUnlocked = false;
    }
    
    if (isUnlocked) {     
      //Audio.playButton();

      localStorage.mode = 'hard';
      Stage.start();
    }

    return isUnlocked;
  }

  /** 
   * 효과음 On/Off 콜백 함수.
   */
  function oneffects_() {
    var enable = Effects.isEnabled();
    enable = !enable;
    Effects.set(enable);

    return enable;
  }
  
  /** 
   * 로그인 콜백 함수.
   */
  function onlogin_() {
    Login.init();
  }

  return {
  	start: start
  };
});