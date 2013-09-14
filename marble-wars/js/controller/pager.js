define(['config', 'controller/menu', 'controller/stage'], function(Config, Menu, Stage) {
  
  /** 
   * View 전환을 시작한다. (현재 사용하지 않는다.)
   * @param {String} from 현재 View
   * @param {String} to 이동하고자 하는 View
   */
  function start(from, to) {
    var width_ = Config.width();
    var height_ = Config.height();

    switch (to) {
      case 'menu':
        Menu.start();
        break;
      case 'stage':
        Stage.start();
        break;
    }
  }

  return {
  	start: start
  };
});