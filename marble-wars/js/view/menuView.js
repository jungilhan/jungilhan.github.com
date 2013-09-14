define(['config', 'lib/collie'], function(Config) {
  /** @private */
  var width_ = Config.width();
  var height_ = Config.height();
  var callbacks_ = null;

  /** 
   * View 렌더 함수.
   * @param {Object} parmas 옵션 정보
   * @param {Object} callbacks 콜백 함수 정보
   */
  function render(params, callbacks) {
    callbacks_ = callbacks;
  	init_(params);
  }

  /** 
   * 초기화 함수.
   * @param {Object} parmas 옵션 정보
   */
  function init_(params) {
    var layer = new collie.Layer({
      width: width_,
      height: height_
    });

    var displayObjects = addDisplayObjects_(layer, params);
    bindEvent_(displayObjects);

    collie.Renderer.addLayer(layer);
    collie.Renderer.load(document.getElementById('menu'));
    collie.Renderer.start();
  }

  /** 
   * 레이어에 객체를 추가한다. 
   * @param {Object} layer 레이어
   * @param {Object} parmas 옵션 정보
   * @return {Object} 레이어에 추가된 객체
   */
  function addDisplayObjects_(layer, params) {
    new collie.DisplayObject({
      backgroundImage: 'background'
    }).addTo(layer);

    var title = new collie.DisplayObject({
      x: 272,
      y: 10,
      backgroundImage: 'menuTitle'
    }).addTo(layer);

    var rule = new collie.DisplayObject({
      x: 590,
      y: 5,
      backgroundImage: 'menuRule'
    }).addTo(layer);

    var settings = new collie.DisplayObject({
      x: 590,
      y: 70,
      backgroundImage: 'menuSettings'
    }).addTo(layer);

    var scrollArea = new collie.DisplayObject({
      x: 0,
      y: 0,
      backgroundImage: 'menuScrollArea'
    }).addTo(layer);

    var easy = new collie.DisplayObject({
      x: 50,
      y: 170,
      backgroundImage: 'menuEasy'
    }).addTo(layer);

    var mode = 'menuNormalLock';
    if (params.highestMode == 'normal' || params.highestMode == 'hard') {
      mode = 'menuNormal';
    }
    var normal = new collie.DisplayObject({
      x: 300,
      y: 170,
      backgroundImage: mode
    }).addTo(layer);

    mode = 'menuHardLock';
    if (params.highestMode == 'hard') {
      mode = 'menuHard';
    }
    var hard = new collie.DisplayObject({
      x: 550,
      y: 170,
      backgroundImage: mode
    }).addTo(layer);

    var dim = new collie.DisplayObject({
      x: 0,
      y: 0,
      width: width_,
      height: height_,
      backgroundImage: 'dimBackground',
      visible: false
    }).addTo(layer);

    var rulePopups = [];
    for (var i = 0; i < 3; i++) {
      var popup = new collie.DisplayObject({
        x: (width_ - 554) / 2,
        y: (height_ - 433) / 2,
        backgroundImage: 'menuRule' + (i + 1),
        visible: false
      }).addTo(layer);

      var close = new collie.Rectangle({
        x: 490,
        y: 10,
        width: 60,
        height: 60,
        strokeColor: 'white',
        strokeWidth: 0,
        visible: false
      }).addTo(popup);

      var next = new collie.Rectangle({
        x: 554 / 2 - 50,
        y: 370,
        width: 100,
        height: 50,
        strokeColor: 'white',
        strokeWidth: 0,
        visible: false
      }).addTo(popup);

      popup.set({
        index: i,
        close: close,
        next: next
      });

      rulePopups.push(popup);
    }

    var settingsPopup = new collie.DisplayObject({
        x: (width_ - 554) / 2,
        y: (height_ - 433) / 2,
        backgroundImage: 'menuSettingsBg',
        visible: false
    }).addTo(layer);

    var settingsClose = new collie.Rectangle({
      x: 490,
      y: 10,
      width: 60,
      height: 60,
      strokeColor: 'white',
      strokeWidth: 0,
      visible: false
    }).addTo(settingsPopup);

    var effects = new collie.Rectangle({
      x: 130,
      y: 150,
      width: 300,
      height: 60,
      strokeColor: 'black',
      strokeWidth: 0,
      visible: false
    }).addTo(settingsPopup);

    new collie.Text({
      width : 100,
      height : 50,
      x : 30,
      y : 10,
      fontColor : 'black',
      fontSize: 32,
      fontWeight: 'bold',
    }).text('Sound').addTo(effects);
    
    var effectsIcon = new collie.DisplayObject({
      x: 220,
      y: 0,
      backgroundImage: params.effects == true ? 'menuSettingsSoundOn' : 'menuSettingsSoundOff'
    }).addTo(effects);

    settingsPopup.set({
      close: close,
      effects: effects,
      icon: effectsIcon
    });

    return {
      rule: rule,
      settings: settings,
      scrollArea: scrollArea,
      easy: easy,
      normal: normal,
      hard: hard,
      dim: dim,
      rulePopups: rulePopups,
      settingsPopup: settingsPopup
    };
  }

  /** 
   * 객체에 대한 이벤트를 등록한다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function bindEvent_(displayObjects) {
    displayObjects.rule.attach({
      click: function(e) {
        console.log('rule clicked');
        showRulePopup_(displayObjects, 0);
      }
    });

    var length = displayObjects.rulePopups.length;
    for (var i = 0; i < length; i++) {
      var close = displayObjects.rulePopups[i].get('close');
      close.attach({
        click: function(e) {
          hideAllRulePopups_(displayObjects);
        }
      })

      var next = displayObjects.rulePopups[i].get('next');
      next.attach({
        click: function(e) {
          nextRule_(displayObjects, e.displayObject.getParent().get('index'));
        }
      });
    }

    displayObjects.settings.attach({
      click: function(e) {
        console.log('settings clicked'); 
        showSettingsPopup_(displayObjects);
      }
    });

    displayObjects.settingsPopup.get('close').attach({
      click: function(e) {
        hideSettingsPopup_(displayObjects);
      }
    });

    var effects = displayObjects.settingsPopup.get('effects')    
    effects.attach({
      click: function(e) {
        console.log('effects clicked');

        var enable = true;
        if (callbacks_ != null && callbacks_.oneffects != null) {
          enable = callbacks_.oneffects();
        }

        var icon = displayObjects.settingsPopup.get('icon');
        if (enable) {
          icon.set({
            backgroundImage: 'menuSettingsSoundOn'
          });
        } else {
          icon.set({
            backgroundImage: 'menuSettingsSoundOff'
          });
        }
      }
    });

    displayObjects.easy.attach({
      click: function(e) {        
        console.log('easy clicked');        

        if (callbacks_ != null && callbacks_.oneasy != null) {
          callbacks_.oneasy();
          detachAll_(displayObjects);
        }
      }
    });

    displayObjects.normal.attach({
      click: function(e) {
        console.log('normal clicked');           

        if (callbacks_ != null && callbacks_.onnormal != null) {
          if (callbacks_.onnormal()) {
            detachAll_(displayObjects);  
          }          
        }
      }
    });

    displayObjects.hard.attach({
      click: function(e) {
        console.log('hard clicked');            

        if (callbacks_ != null && callbacks_.onhard != null) {
          if (callbacks_.onhard()) {
            detachAll_(displayObjects);
          }
        }
      }
    });

    displayObjects.dim.attach({
      click: function(e) {
        // Dim 아래에 있는 객체에 클릭 이벤트가 전달되지 않도록 Dim에서 클릭 이벤트를 소진한다.
      }
    });
  }

  /** 
   * 게임 방법을 설명하는 팝업을 띄운다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   * @param {Object} index 인덱스 (게임 방법에 총 3개의 팝업을 사용하고 있음)
   */
  function showRulePopup_(displayObjects, index) {
    displayObjects.dim.set({visible: true});

    var length = displayObjects.rulePopups.length;
    for (var i = 0; i < length; i++) {
      if (i == index) {
        displayObjects.rulePopups[i].set({visible: true});    
        displayObjects.rulePopups[i].get('close').set({visible: true});    
        displayObjects.rulePopups[i].get('next').set({visible: true});    
      } else {
        displayObjects.rulePopups[i].set({visible: false});  
        displayObjects.rulePopups[i].get('close').set({visible: false});    
        displayObjects.rulePopups[i].get('next').set({visible: false});    
      }      
    }    
  }

  /** 
   * 게임 방법 팝업의 다음 인덱스에 해당하는 팝업을 띄운다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   * @param {Object} index 현재 띄워진 게임 팝업 인덱스
   */
  function nextRule_(displayObjects, current) {  
    var length = displayObjects.rulePopups.length;
    for (var i = 0; i < length; i++) {
      if (i == current) {
        var next;
        if (i == length - 1) {
          next = 0;
        } else {
          next = i + 1;
        }

        console.log('hide: ' + i + ' show: ' + next);
        showRulePopup_(displayObjects, next);
        break;
      }
    }    

  }

  /** 
   * 모든 게임 방법 팝업을 닫는다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function hideAllRulePopups_(displayObjects) {
    displayObjects.dim.set({visible: false});

    var length = displayObjects.rulePopups.length;
    for (var i = 0; i < length; i++) {
      hideRulePopup_(displayObjects.rulePopups[i]);
    }
  } 

  /** 
   * 게임 방법 팝업을 닫는다.
   * @param {Object} rulePopup 닫을 팝업 객체
   */
  function hideRulePopup_(rulePopup) {
    rulePopup.set({visible: false});
    rulePopup.get('close').set({visible: false});    
    rulePopup.get('next').set({visible: false});
  }

  /** 
   * 설정 팝업을 띄운다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function showSettingsPopup_(displayObjects) {
    displayObjects.dim.set({visible: true});
    displayObjects.settingsPopup.set({visible: true});
    displayObjects.settingsPopup.get('close').set({visible: true});
    displayObjects.settingsPopup.get('effects').set({visible: true});
  } 
  
  /** 
   * 설정 팝업을 닫는다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function hideSettingsPopup_(displayObjects) {
    displayObjects.dim.set({visible: false});
    displayObjects.settingsPopup.set({visible: false});
    displayObjects.settingsPopup.get('close').set({visible: false});
    displayObjects.settingsPopup.get('effects').set({visible: false});
  } 

  /** 
   * 객체에 대한 모든 이벤트를 해지한다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function detachAll_(displayObjects) {
    var layer = displayObjects.easy.getLayer();
    for (var i = 0; i < layer.getChildren().length; i++) {
      layer.getChildren()[i].detachAll();
    }
  }

  return {
  	render: render
  };
});