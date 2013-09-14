define(['config', 'lib/collie'], function(Config) {
  /** @private */
  var width_ = Config.width();
  var height_ = Config.height();
  var callbacks_ = null;
  var selectedHeap_ = null;
  var isMachineTurn_ = false;

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
    console.log(params.marbles);

    var layer = new collie.Layer({
      width: width_,
      height: height_
    });

    var displayObjects = addDisplayObjects_(layer, params);
    displayObjects.heaps = createMables_(displayObjects.heaps, params.marbles);
    bindEvent_(displayObjects);

    drawDisplay_(displayObjects.heaps);

    collie.Renderer.addLayer(layer);
    collie.Renderer.load(document.getElementById('game'));
    collie.Renderer.start();
  }

  /** 
   * 레이어에 객체를 추가한다. 
   * @param {Object} layer 레이어
   * @param {Object} parmas 옵션 정보
   * @return {Object} 레이어에 추가된 객체
   */
  function addDisplayObjects_(layer, params) { 
    var background = new collie.DisplayObject({
      backgroundImage: 'gameBackground'
    }).addTo(layer);

    var left = new collie.Rectangle({          
      width: 210,
      height: 230,
      x: 80,
      y: 80,
      strokeColor: 'white',
      strokeWidth: 0
    }).addTo(layer);

    var center = new collie.Rectangle({          
      width: 210,
      height: 230,
      x: left.get('x') + left.get('width') + 5,
      y: 80,
      strokeColor: 'white',
      strokeWidth: 0
    }).addTo(layer);

    var right = new collie.Rectangle({          
      width: 210,
      height: 230,
      x: center.get('x') + center.get('width') + 5,
      y: 80,
      strokeColor: 'white',
      strokeWidth: 0
    }).addTo(layer);

    var textLeft = new collie.Text({
      width : 210,
      height : 30,
      x : 80,
      y : 80,
      fontColor : '#000000',
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center'
    }).text('0').addTo(layer);

    var textCenter = new collie.Text({
      width : 210,
      height : 30,
      x : left.get('x') + left.get('width') + 5,
      y : 80,
      fontColor : '#000000',
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center'
    }).text('0').addTo(layer);

    var textRight = new collie.Text({
      width : 210,
      height : 30,
      x: center.get('x') + center.get('width') + 5,
      y: 80,
      fontColor : '#000000',
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center'
    }).text('0').addTo(layer);

    var comChest = new collie.Rectangle({
      width: 210,
      height: 70,
      x: left.get('x') + left.get('width') + 5,
      y: 0,
      strokeColor: 'white',
      strokeWidth: 0
    }).addTo(layer); 

    var userChest = new collie.Rectangle({
      width: 210,
      height: 80,
      x: left.get('x') + left.get('width') + 5,
      y: left.get('y') + left.get('height') + 15,
      strokeColor: 'white',
      strokeWidth: 0
    }).addTo(layer); 

    var go = new collie.DisplayObject({
      x: right.get('x') + 45,
      y: left.get('y') + left.get('height') + 5,
      backgroundImage: 'gameGoNormal'
    }).addTo(layer);

    var gameMode = 'gameEasy';
    if (params.mode == 'normal') {
      gameMode = 'gameNormal';
    } else if (params.mode == 'hard') {
      gameMode = 'gameHard';
    }

    var mode = new collie.DisplayObject({
      x: 10,
      y: 10,
      backgroundImage: gameMode
    }).addTo(layer);

    var stage = new collie.Text({
      width : 50,
      height : 20,
      x: gameMode == 'gameNormal' ? 125 : 110,
      y: 15, 
      fontColor : 'black',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    }).text(params.stage + '/' + params.totalStage).addTo(mode);

    var again = new collie.DisplayObject({
      x: right.get('x') + 30,
      y: 10,
      backgroundImage: 'gameAgain'
    }).addTo(layer);

    var dim = new collie.DisplayObject({
      x: 0,
      y: 0,
      width: width_,
      height: height_,
      backgroundImage: 'dimBackground',
      visible: false
    }).addTo(layer);

    var winPopup = new collie.DisplayObject({
      x: (width_ - 554) / 2,
      y: (height_ - 433) / 2,
      backgroundImage: 'gameWinPopupBg',
      visible: false
    }).addTo(layer);

    /*
    var winMessage = new collie.Text({
      x : 0,
      y : 170,
      width : 554,
      height : 40,
      fontColor : '#000000',
      fontSize: 38,
      fontWeight: 'bold',
      textAlign: 'center'
    }).text('당신이 이겼습니다!').addTo(winPopup);
    */

    var winPopupAgain = new collie.DisplayObject({
      x: 90,
      y: 290,
      backgroundImage: 'gameWinPopupAgain',
      visible: false
    }).addTo(winPopup);

    var winPopupNextStage = new collie.DisplayObject({
      x: 90 + 165,
      y: 290,
      backgroundImage: 'gameNextStage',
      visible: false
    }).addTo(winPopup);

    var losePopup = new collie.DisplayObject({
      x: (width_ - 554) / 2,
      y: (height_ - 433) / 2,
      backgroundImage: 'gameLosePopupBg',
      visible: false
    }).addTo(layer);

    /*
    var loseMessage = new collie.Text({
      x : 0,
      y : 170,
      width : 554,
      height : 40,
      fontColor : '#000000',
      fontSize: 38,
      fontWeight: 'bold',
      textAlign: 'center'
    }).text('당신이 졌습니다!').addTo(losePopup);
    */

    var losePopupAgain = new collie.DisplayObject({
      x: (554 - 230) / 2,
      y: 290,
      backgroundImage: 'gameLosePopupAgain',
      visible: false
    }).addTo(losePopup);

    var heaps = [];
    heaps.push({rectangle: left, marbles: [], display: textLeft});
    heaps.push({rectangle: center, marbles: [], display: textCenter});
    heaps.push({rectangle: right, marbles: [], display: textRight}); 

    return {
      heaps: heaps,
      comChest: comChest,
      userChest: userChest,
      go: go,
      again: again,
      mode: mode,
      stage: stage,
      dim: dim,
      winPopup: winPopup,      
      winAgain: winPopupAgain,
      winNext: winPopupNextStage,
      losePopup: losePopup,
      loseAgain: losePopupAgain
    };
  }

  /**
   * heap에 여러개의 구슬을 생성한다.
   * @param {Array} heap 배열
   * @param {Array|Number} heap당 구슬 개수
   * @return {Array} heap 배열
   */
  function createMables_(heaps, marbles) {
    var marbleWidth = 40;
    var marbleHeight = 48;
    var minX = marbleWidth;
    var maxX = heaps[0].rectangle.get('width') - marbleWidth;
    var minY = marbleHeight;
    var maxY = heaps[0].rectangle.get('height') - marbleHeight;

    marbles = shuffle(marbles);
    for (var i = 0; i < heaps.length; i++) {
      for (var j = 0; j < marbles[i]; j++) {
        var marble = createMarble_(getRandomInt_(minX, maxX), getRandomInt_(minY, maxY));
        marble.addTo(heaps[i].rectangle);
        heaps[i].marbles.push(marble);
      }

      console.log(heaps[i].rectangle.getChildren().length);
    }

    return heaps;
  }

  /** 
   * 구슬을 생성한다.
   * @param {Number} x, y 좌표
   * @return {Object} 구슬을 반환한다. 
   */
  function createMarble_(x, y) {
    var marble = new collie.DisplayObject({
      x: x,
      y: y,
      backgroundImage: 'gameMarble'
    });

    return marble;
  }

  /** @private 
   *  현재 사용하지 않는 함수
   */
  function createMables__(heaps, maxMarblePerHeap) {
    var marbleWidth = 40;
    var marbleHeight = 48;
    var minX = marbleWidth;
    var maxX = heaps[0].rectangle.get('width') - marbleWidth;
    var minY = marbleHeight;
    var maxY = heaps[0].rectangle.get('height') - marbleHeight;

    for (var i = 0; i < heaps.length; i++) {
      for (var j = 0; j < getRandomInt_(1, maxMarblePerHeap - 1); j++) {
        var marble = createMarble_(getRandomInt_(minX, maxX), getRandomInt_(minY, maxY));
        marble.addTo(heaps[i].rectangle);
        heaps[i].marbles.push(marble);
      }

      console.log(heaps[i].rectangle.getChildren().length);
    }

    return heaps;
  }
  
  /** 
   * 현재 구슬의 개수를 표시한다. 
   * @param {Array} heap 배열
   */
  function drawDisplay_(heaps) {
    for (var i = 0; i < heaps.length; i++) {
      heaps[i].display.text(heaps[i].rectangle.getChildren().length);
    }
  }

  /** 
   * 모든 Heap의 구슬 개수를 반환한다.
   * @param {Array} marbles 구슬 개수 
   */
  function getCurrentMarbles(heaps) {
    var marbles = [];
    for (var i = 0; i < heaps.length; i++) {
      marbles.push(heaps[i].rectangle.getChildren().length);
    }

    return marbles;
  }

  /** 
   * 객체에 대한 이벤트를 등록한다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function bindEvent_(displayObjects) {    
    for (var i = 0; i < displayObjects.heaps.length; i++) {
      displayObjects.heaps[i].rectangle.detachAll();
      displayObjects.heaps[i].rectangle.attach({
        click: function(e) {
          var length = e.displayObject.getChildren().length;
          if (length == 0) {
            return;
          }

          // 사용자가 모든 구슬을 가져가는 경우에 대한 예외처리
          var marbles = getCurrentMarbles(displayObjects.heaps);
          if (marbles[0] + marbles[1] + marbles[2] == 1) {
            console.log('You can not take the last marble!');
            return;
          }

          if (selectedHeap_ == null) {
            selectedHeap_ = e.displayObject;
          } else {
            if (selectedHeap_ != e.displayObject) {
              console.log('You have to select only one heap!');
              return;
            }
          }

          var index = getRandomInt_(0, length - 1);
          console.log(length + ' ' + index);
          var marble = e.displayObject.getChildren()[index];
          move_(marble, e.displayObject, displayObjects.userChest, function() {
            drawDisplay_(displayObjects.heaps);  
          });
        }
      });    
    }

    displayObjects.mode.attach({
      click: function(e) {
        if (callbacks_ != null && callbacks_.onback != null) {
          selectedHeap_ = null;
          callbacks_.onback();
          detachAll_(displayObjects);
        }
      }
    });

    displayObjects.userChest.attach({
      click: function(e) {
        var length = e.displayObject.getChildren().length;
        if (length == 0) {
          return;
        }

        var index = getRandomInt_(0, length - 1);
        var marble = e.displayObject.getChildren()[index];
        move_(marble, e.displayObject, marble.get('from'), function() {
          drawDisplay_(displayObjects.heaps);
          
          if (e.displayObject.getChildren().length == 0) {
            selectedHeap_ = null;
          }
        }); 
      }
    });

    displayObjects.go.attach({
      mousedown: function(e) {
        if (callbacks_ != null && callbacks_.ongo != null) {
          callbacks_.ongo();
        }

        displayObjects.go.set({
          backgroundImage: 'gameGoDown'
        })
      },
      mouseup: function(e) {
        displayObjects.go.set({
          backgroundImage: 'gameGoNormal'
        })

        if (isMachineTurn_)
          return;        

        if (takeUser_(displayObjects.userChest)) {
          isMachineTurn_ = true;
          setTimeout(function() {
            if (callbacks_ != null && callbacks_.onmachineturn != null) {              
              var marbles = getCurrentMarbles(displayObjects.heaps);
              var result = callbacks_.onmachineturn(marbles);
              if (result == null) {
                // 사용자가 승리
                isMachineTurn_ = false;
                showWinPopup(displayObjects);
                return;
              }

              var removeCount = displayObjects.heaps[result.heapIndex].rectangle.getChildren().length - result.marble;
              machineTurn_(displayObjects, result.heapIndex, removeCount);
              isMachineTurn_ = false;
            }            
          }, 500);
        }
      }
    });

    displayObjects.again.attach({
      click: function(e) {
        if (callbacks_ != null && callbacks_.onagain != null) {
          selectedHeap_ = null;
          callbacks_.onagain();
          detachAll_(displayObjects);
        }
      }
    });

    displayObjects.winAgain.attach({
      click: function(e) {
        if (callbacks_ != null && callbacks_.onagain != null) {
          selectedHeap_ = null;
          hideWinPopup(displayObjects);
          callbacks_.onagain();
          detachAll_(displayObjects);
        }
      }
    });

    displayObjects.loseAgain.attach({
      click: function(e) {
        if (callbacks_ != null && callbacks_.onagain != null) {
          selectedHeap_ = null;
          hideLosePopup(displayObjects);
          callbacks_.onagain();
          detachAll_(displayObjects);
        }
      }
    });

    displayObjects.winNext.attach({
      click: function(e) {
        if (callbacks_ != null && callbacks_.onnext != null) {
          selectedHeap_ = null;
          hideWinPopup(displayObjects);
          callbacks_.onnext();
          detachAll_(displayObjects);
        }
      }
    });

    displayObjects.dim.attach({
      click: function(e) {
        // Dim 아래에 있는 객체에 클릭 이벤트가 전달되지 않도록 Dim에서 클릭 이벤트를 소진한다.
      }
    })
  }

  /** 
   * 컴퓨터 턴에 대한 처리를 한다.
   * @param {Array} displayObjects 화면에 보여지는 객체 집합
   * @param {Number} heapIndex heap 인덱스
   * @param {Number} removeCount 제거할 구슬 개수
   */
  function machineTurn_(displayObjects, heapIndex, removeCount) {
    var heap = displayObjects.heaps[heapIndex].rectangle;
    var length = heap.getChildren().length;

    if (removeCount > length)
      return;

    for (var i = 0; i < removeCount; i++) {
      var marble = heap.getChildren()[i];
      moveDelayed_(marble, heap, displayObjects.comChest, 200 * i, function() {
        drawDisplay_(displayObjects.heaps); 
      });
    }

    setTimeout(function() {
      takeCom_(displayObjects.comChest);      
    }, removeCount * 200 + 200);

    // COM 승리 체크
    setTimeout(function() {
      var marbles = getCurrentMarbles(displayObjects.heaps);
      if (marbles[0] + marbles[1] + marbles[2] == 1) {                    
        showLosePopup(displayObjects);
      }
    }, removeCount * 200 + 400);
  }

  /** 
   * Delay를 이용한 구슬 이동 함수.
   * @param {Object} marble 구슬 객체
   * @param {Object} from 구슬의 원래 위치
   * @param {Object} to 구슬이 이동될 위치
   * @param {Number} delay 지연 시간
   * @param {Object} complete 이동 완료 콜백
   */
  function moveDelayed_(marble, from, to, delay, complete) {
    setTimeout(function() {      
      move_(marble, from, to, function() {
        if (complete != null) {
          complete();
        }
      });
    }, delay);
  }

  /** 
   * 구슬 이동 함수.
   * @param {Object} marble 구슬 객체
   * @param {Object} from 구슬의 원래 위치
   * @param {Object} to 구슬이 이동될 위치
   * @param {Object} complete 이동 완료 콜백
   */
  function move_(marble, from, to, complete) {
    if (callbacks_ != null && callbacks_.onmove != null) {    
      callbacks_.onmove();
    }

    var width = marble.get('width');
    var height = marble.get('height');        
    var toMinX = to.getBoundary().left;
    var toMaxX = to.getBoundary().right - width;
    var toMinY = to.getBoundary().top;
    var toMaxY = to.getBoundary().bottom - height;

    var toPos = {x: getRandomInt_(toMinX, toMaxX), y: getRandomInt_(toMinY, toMaxY)};

    // 구슬의 절대 좌표
    var absolutePos = marble.getRelatedPosition();

    // 원본 구슬 삭제
    from.removeChild(marble);

    // 이동에 필요한 임시 구슬 생성
    var tmpMarble = createMarble_(absolutePos.x, absolutePos.y);
    tmpMarble.addTo(from.getLayer());
    tmpMarble.move(toPos.x, toPos.y, 1500, function() {
      // 임시 구슬 삭제
      tmpMarble.getLayer().removeChild(tmpMarble);

      // 내 서랍장에 새로운 구슬 생성
      var position = {x: tmpMarble.get('x'), y: tmpMarble.get('y')};
      var relativePos = getRelativePostion_(position.x, position.y, to);
      var marble = createMarble_(relativePos.x, relativePos.y);
      marble.set({
        from: from
      });
      marble.addTo(to);

      if (complete) {
        complete();
      }
    });
  }

  /** 
   * 컴퓨터의 서랍에서 구슬을 제거한다.
   * @param {Object} chest 서랍
   */
  function takeCom_(chest) {
    var length = chest.getChildren().length;
    for (var i = 0; i < length; i++) {
      console.log('take: ' + i);
      take_(i, chest, 'up', function(params) {        
        if (params.index == length -1) {
          removeAllMarblesInChest(chest);
        }
      });
    }
  }

  /** 
   * 사용자의 서랍에서 구슬을 제거한다.
   * @param {Object} chest 서랍
   * @return {Boolean} 성공 여부
   */
  function takeUser_(chest) {
    var length = chest.getChildren().length;
    if (length == 0) {
      return false;
    }

    for (var i = 0; i < length; i++) {
      take_(i, chest, 'down', function(params) {
        if (params.index == length -1) {
          removeAllMarblesInChest(chest);
        }
      });
    }

    return true;
  }

  /** 
   * 서랍에서 구슬을 제거한다.
   * @param {Number} index 제거할 구슬의 인덱스
   * @param {Object} chest 제거할 서랍
   * @param {String} direction 방향
   * @param {Object} complete 이동 완료 콜백
   */
  function take_(index, chest, direction, oncomplete) {
    var marble = chest.getChildren()[index]
    var toPos = null;    

    switch (direction) {
      case 'up':
        toPos = {x: marble.get('x'), y: -100};
        break;
      case 'down':
        toPos = {x: marble.get('x'), y: height_};
        break;
    }

    if (toPos != null) {
      marble.move(toPos.x, toPos.y, 1500, function() {
        if (oncomplete != null) {
          oncomplete({index: index});
          selectedHeap_ = null;
        }
      });
    }    
  }

  /** 
   * 서랍에서 모든 구슬을 제거한다.
   * @param {Object} chest 제거할 서랍
   */
  function removeAllMarblesInChest(chest) {
    for (var i = chest.getChildren().length - 1; i >= 0 ; i--) {
      chest.removeChild(chest.getChildren()[i]);    
    }
  }

  /** 
   * Win 팝업을 보여준다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function showWinPopup(displayObjects) {
    displayObjects.dim.set({visible: true});
    displayObjects.winPopup.set({visible: true});
    displayObjects.winAgain.set({visible: true});
    displayObjects.winNext.set({visible: true});
  }

  /** 
   * Win 팝업을 닫는다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function hideWinPopup(displayObjects) {
    displayObjects.dim.set({visible: false});
    displayObjects.winPopup.set({visible: false});
    displayObjects.winAgain.set({visible: false});
    displayObjects.winNext.set({visible: false});
  }

  /** 
   * Lose 팝업을 보여준다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function showLosePopup(displayObjects) {
    displayObjects.dim.set({visible: true});
    displayObjects.losePopup.set({visible: true});
    displayObjects.loseAgain.set({visible: true});
  }

  /** 
   * Lose 팝업을 닫는다.
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function hideLosePopup(displayObjects) {
    displayObjects.dim.set({visible: false});
    displayObjects.losePopup.set({visible: false});
    displayObjects.loseAgain.set({visible: false});
  }

  /** 
   * heap의 상대 좌표를 구한다.
   * @param {Number} x 좌표
   * @param {Number} y 좌표 
   * @param {Object} collie의 rectangle 객체
   * @return {Object} 상대 좌표
   */
  function getRelativePostion_(x, y, rectangle) {
    return {
      x: x - rectangle.get('x'),
      y: y - rectangle.get('y')
    };
  }

  /** 
   * 랜덤 값을 반환한다.
   * @param {Number} 최소 값
   * @param {Number} 최대 값
   * @return {Number} 랜덤 값
   */
  function getRandomInt_(lower, upper) {
    return Math.floor(lower + (Math.random() * (upper - lower + 1)));
  }

  /** 
   * Array의 요소를 랜덤하게 섞는다. 
   * @param {Number} array 원본 
   * @return {Number} array 섞인 array
   */
  var shuffle = function(array) {
    var tmp, current, top = array.length;

    if (top) while(--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
    }

    return array;
  };


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