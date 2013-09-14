define(['config', 'lib/collie'], function(Config) {
  /** @private */
  var width_ = Config.width();
  var height_ = Config.height();
  var params_ = {};
  var callbacks_ = null;

  /** 
   * View 렌더 함수.
   * @param {Object} parmas 옵션 정보
   * @param {Object} callbacks 콜백 함수 정보
   */
  function render(params, callbacks) {
    params_ = params;
    callbacks_ = callbacks;
  	init_();
  }

  /** 
   * 초기화 함수.
   */
  function init_() {
    var layer = new collie.Layer({
      width: width_,
      height: height_
    });

    var displayObjects = addDisplayObjects_(layer);
    bindEvent_(displayObjects);

    collie.Renderer.addLayer(layer);
    collie.Renderer.load(document.getElementById('stage'));
    collie.Renderer.start();
  }

  /** 
   * 레이어에 객체를 추가한다. 
   * @param {Object} layer 레이어
   * @return {Object} 레이어에 추가된 객체
   */
  function addDisplayObjects_(layer) { 
    var background = new collie.DisplayObject({
      backgroundImage: 'stageBackground'
    }).addTo(layer);

    var title = '';
    if (params_.mode == 'easy') {
      title = 'stageEasy';
    } else if (params_.mode == 'normal') {
      title = 'stageNormal';
    } else {
      title = 'stageHard';
    }

    var mode = new collie.DisplayObject({
      x: 10,
      y: 10,
      backgroundImage: 'stageBack'
    }).addTo(layer);

    var title = new collie.DisplayObject({
      x: 'center',
      y: 0,
      backgroundImage: title,
      strokeColor: 'white',
      strokeWidth: 1
    }).addTo(layer);

    var stages = [];
    var locks = [];

    // 첫번째 행
    for (var i = 0; i < 9; i++) {
      var stage = new collie.DisplayObject({
        x: 40 + (77 * i) + 10,
        y: 110,
        backgroundImage: 'stage'
      }).addTo(layer);

      new collie.DisplayObject({
        x: 27,
        y: 20,
        backgroundImage: 'stage' + (i + 1)
      }).addTo(stage);

      new collie.DisplayObject({
        x: 26,
        y: 20,
        backgroundImage: 'stageLock'
      }).addTo(stage);

      stages.push(stage);
    }

    // 두번째 행
    for (var i = 0; i < 9; i++) {
      var stage = new collie.DisplayObject({
        x: 40 + (77 * i) + 10,
        y: 110 + 89,
        backgroundImage: 'stage'
      }).addTo(layer);
      
      new collie.DisplayObject({
        x: 17,
        y: 20,
        backgroundImage: 'stage' + 1
      }).addTo(stage);

      new collie.DisplayObject({
        x: 37,
        y: 20,
        backgroundImage: 'stage' + i
      }).addTo(stage);

      new collie.DisplayObject({
        x: 26,
        y: 20,
        backgroundImage: 'stageLock'
      }).addTo(stage);

      stages.push(stage);
    }

    var maxLength = 9;
    if (params_.mode == 'easy') {
      maxLength = 7;
    } 

    // 세번째 행
    for (var i = 0; i < maxLength; i++) {
      var stage = new collie.DisplayObject({
        x: 40 + (77 * i) + 10,
        y: 110 + 89 + 89,
        backgroundImage: 'stage'
      }).addTo(layer);      

      var j;
      switch (i) {
        case 0:  j = 1;  break;
        default: j = 2; break;
      }

      new collie.DisplayObject({
        x: 17,
        y: 20,
        backgroundImage: 'stage' + j
      }).addTo(stage);

      var k;
      switch (i) {
        case 0: k = 9; break;
        case 1: k = 0; break;
        default: k = i - 1; break;
      }

      new collie.DisplayObject({
        x: 37,
        y: 20,
        backgroundImage: 'stage' + k
      }).addTo(stage);

      new collie.DisplayObject({
        x: 26,
        y: 20,
        backgroundImage: 'stageLock'
      }).addTo(stage);

      stages.push(stage);
    }    

    var maxLength = 3;
    if (params_.mode == 'easy') {
      maxLength = 0;
    } 

    // 네번째 행
    for (var i = 0; i < maxLength; i++) {
      var stage = new collie.DisplayObject({
        x: 40 + (77 * i) + 10,
        y: 110 + 89 + 89 + 89,
        backgroundImage: 'stage'
      }).addTo(layer);      

      var j;
      switch (i) {
        case 0:  
        case 1: j = 2; break;
        case 2: j = 3; break;
      }

      new collie.DisplayObject({
        x: 17,
        y: 20,
        backgroundImage: 'stage' + j
      }).addTo(stage);

      var k;
      switch (i) {
        case 0: k = 8; break;
        case 1: k = 9; break;
        case 2: k = 0; break;
      }

      new collie.DisplayObject({
        x: 37,
        y: 20,
        backgroundImage: 'stage' + k
      }).addTo(stage);

      new collie.DisplayObject({
        x: 26,
        y: 20,
        backgroundImage: 'stageLock'
      }).addTo(stage);

      stages.push(stage);
    }    

    // 자물쇠 제거
    var highestStage = params_.highestStage;
    console.log('highestStage: ' + highestStage + ', stages.length: ' + stages.length);
    for (var i = 0; i < highestStage; i++) {
      if (i < stages.length) {
        var length = stages[i].getChildren().length;
        var child = stages[i].getChildren()[length - 1];
        child.set({visible: false});
      }      
    }

    // 자물쇠만 표시
    for (var i = highestStage; i < stages.length; i++) {
      var length = stages[i].getChildren().length;    
      for (var j = 0; j < length - 1; j++) {
        stages[i].getChildren()[j].set({visible: false});
      }
    }

    // 최고 난이도가 normal인 경우, easy의 모든 stage를 unlock처리 또는
    // 최고 난이도가 hard인 경우, easy, noraml의 stage를 unlock처리
    var highestMode = params_.highestMode;
    if (params_.mode == 'easy' && (highestMode == 'normal' || highestMode == 'hard')
      || params_.mode == 'normal' && highestMode == 'hard') {
      for (var i = 0; i < stages.length; i++) {
        var length = stages[i].getChildren().length;
        var lock = stages[i].getChildren()[length - 1];
        lock.set({visible: false});
      }

      for (var i = 0; i < stages.length; i++) {
        var length = stages[i].getChildren().length;
        for (var j = 0; j < length - 1; j++) {
          var number = stages[i].getChildren()[j];
          number.set({visible: true});
        }
      }
    }

    return {
      mode: mode,
      stages: stages
    };
  }

  /** 
   * 객체에 대한 이벤트를 등록한다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function bindEvent_(displayObjects) {
    var stages = displayObjects.stages;
    for (var i = 0; i < stages.length; i++) {
      bindStage(stages[i], i + 1, displayObjects);
    }    

    displayObjects.mode.attach({
      click: function(e) {
        if (callbacks_ != null && callbacks_.onback != null) {
          callbacks_.onback();
          detachAll_(displayObjects);
        }
      }
    });
  }

  /** 
   * Stage 이벤트를 등록한다. 
   * @param {Object} stage Collie 객체
   * @param {Number} index 판을 의미(1, 2, 3..)
   * @param {Object} displayObjects 화면에 보여지는 객체 집합, 이벤트 해지에 사용한다.
   */
  function bindStage(stage, index, displayObjects) {
    stage.attach({
      click: function(e) {
        console.log('stage clicked! ' +  index);

        if (callbacks_ != null && callbacks_.onstage != null) {
          if (callbacks_.onstage(params_.mode, index)) {
            detachAll_(displayObjects);
          }
        }
      }
    });
  }

  /** 
   * 객체에 대한 모든 이벤트를 해지한다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function detachAll_(displayObjects) {
    var layer = displayObjects.mode.getLayer();
    for (var i = 0; i < layer.getChildren().length; i++) {
      layer.getChildren()[i].detachAll();
    }
  }

  return {
  	render: render
  };
});