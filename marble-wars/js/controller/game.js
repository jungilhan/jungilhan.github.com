define(['view/gameView', 'model/marbles', 'controller/audio', 'model/effects'], function(Game, Marbles, Audio, Effects) {  
  var winHeaps_ = [{'a': 0, 'b': 1, 'c': 0}, {'a': 1, 'b': 1, 'c': 1}, {'a': 1, 'b': 3, 'c': 2}, {'a': 0, 'b': 2, 'c': 2}, {'a': 0, 'b': 3, 'c': 3}, {'a': 0, 'b': 4, 'c': 4}, {'a': 1, 'b': 5, 'c': 4}, {'a': 0, 'b': 5, 'c': 5}, {'a': 0, 'b': 6, 'c': 6}, {'a': 1, 'b': 7, 'c': 6}, {'a': 0, 'b': 7, 'c': 7}, {'a': 0, 'b': 8, 'c': 8}, {'a': 1, 'b': 9, 'c': 8}, {'a': 0, 'b': 9, 'c': 9}, {'a': 0, 'b': 10, 'c': 10}, {'a': 1, 'b': 11, 'c': 10}, {'a': 0, 'b': 11, 'c': 11}, {'a': 0, 'b': 12, 'c': 12}, {'a': 1, 'b': 13, 'c': 12}, {'a': 0, 'b': 13, 'c': 13}, {'a': 0, 'b': 14, 'c': 14}, {'a': 1, 'b': 15, 'c': 14}, {'a': 0, 'b': 15, 'c': 15}, {'a': 0, 'b': 16, 'c': 16}, {'a': 1, 'b': 17, 'c': 16}, {'a': 0, 'b': 17, 'c': 17}, {'a': 0, 'b': 18, 'c': 18}, {'a': 1, 'b': 19, 'c': 18}, {'a': 0, 'b': 19, 'c': 19}, {'a': 0, 'b': 20, 'c': 20}, {'a': 1, 'b': 21, 'c': 20}, {'a': 0, 'b': 21, 'c': 21}, {'a': 2, 'b': 6, 'c': 4}, {'a': 2, 'b': 7, 'c': 5}, {'a': 2, 'b': 10, 'c': 8}, {'a': 2, 'b': 11, 'c': 9}, {'a': 2, 'b': 14, 'c': 12}, {'a': 2, 'b': 15, 'c': 13}, {'a': 2, 'b': 18, 'c': 16}, {'a': 2, 'b': 19, 'c': 17}, {'a': 2, 'b': 22, 'c': 20}, {'a': 3, 'b': 7, 'c': 4}, {'a': 3, 'b': 6, 'c': 5}, {'a': 3, 'b': 11, 'c': 8}, {'a': 3, 'b': 10, 'c': 9}, {'a': 3, 'b': 15, 'c': 12}, {'a': 3, 'b': 14, 'c': 13}, {'a': 3, 'b': 19, 'c': 16}, {'a': 3, 'b': 18, 'c': 17}, {'a': 3, 'b': 22, 'c': 21}, {'a': 4, 'b': 12, 'c': 8}, {'a': 4, 'b': 13, 'c': 9}, {'a': 4, 'b': 14, 'c': 10}, {'a': 4, 'b': 15, 'c': 11}, {'a': 4, 'b': 20, 'c': 16}, {'a': 4, 'b': 21, 'c': 17}, {'a': 4, 'b': 22, 'c': 18}, {'a': 5, 'b': 13, 'c': 8}, {'a': 5, 'b': 12, 'c': 9}, {'a': 5, 'b': 15, 'c': 10}, {'a': 5, 'b': 14, 'c': 11}, {'a': 5, 'b': 21, 'c': 16}, {'a': 5, 'b': 20, 'c': 17}, {'a': 5, 'b': 22, 'c': 19}, {'a': 6, 'b': 14, 'c': 8}, {'a': 6, 'b': 15, 'c': 9}, {'a': 6, 'b': 12, 'c': 10}, {'a': 6, 'b': 13, 'c': 11}, {'a': 6, 'b': 22, 'c': 16}, {'a': 6, 'b': 20, 'c': 18}, {'a': 6, 'b': 21, 'c': 19}, {'a': 7, 'b': 15, 'c': 8}, {'a': 7, 'b': 14, 'c': 9}, {'a': 7, 'b': 13, 'c': 10}, {'a': 7, 'b': 12, 'c': 11}, {'a': 7, 'b': 22, 'c': 17}, {'a': 7, 'b': 21, 'c': 18}, {'a': 7, 'b': 20, 'c': 19}, {'a': 0, 'b': 22, 'c': 22}, {'a': 1, 'b': 23, 'c': 22}, {'a': 0, 'b': 23, 'c': 23}, {'a': 0, 'b': 24, 'c': 24}, {'a': 1, 'b': 25, 'c': 24}, {'a': 0, 'b': 25, 'c': 25}, {'a': 0, 'b': 26, 'c': 26}, {'a': 1, 'b': 27, 'c': 26}, {'a': 0, 'b': 27, 'c': 27}, {'a': 0, 'b': 28, 'c': 28}, {'a': 1, 'b': 29, 'c': 28}, {'a': 0, 'b': 29, 'c': 29}, {'a': 0, 'b': 30, 'c': 30}, {'a': 1, 'b': 31, 'c': 30}, {'a': 2, 'b': 23, 'c': 21}, {'a': 2, 'b': 26, 'c': 24}, {'a': 2, 'b': 27, 'c': 25}, {'a': 2, 'b': 30, 'c': 28}, {'a': 2, 'b': 31, 'c': 29}, {'a': 3, 'b': 23, 'c': 20}, {'a': 3, 'b': 27, 'c': 24}, {'a': 3, 'b': 26, 'c': 25}, {'a': 3, 'b': 31, 'c': 28}, {'a': 3, 'b': 30, 'c': 29}, {'a': 4, 'b': 23, 'c': 19}, {'a': 4, 'b': 28, 'c': 24}, {'a': 4, 'b': 29, 'c': 25}, {'a': 4, 'b': 30, 'c': 26}, {'a': 4, 'b': 31, 'c': 27}, {'a': 5, 'b': 23, 'c': 18}, {'a': 5, 'b': 29, 'c': 24}, {'a': 5, 'b': 28, 'c': 25}, {'a': 5, 'b': 31, 'c': 26}, {'a': 5, 'b': 30, 'c': 27}, {'a': 6, 'b': 23, 'c': 17}, {'a': 6, 'b': 30, 'c': 24}, {'a': 6, 'b': 31, 'c': 25}, {'a': 6, 'b': 28, 'c': 26}, {'a': 6, 'b': 29, 'c': 27}, {'a': 7, 'b': 23, 'c': 16}, {'a': 7, 'b': 31, 'c': 24}, {'a': 7, 'b': 30, 'c': 25}, {'a': 7, 'b': 29, 'c': 26}, {'a': 7, 'b': 28, 'c': 27}, {'a': 8, 'b': 24, 'c': 16}, {'a': 8, 'b': 25, 'c': 17}, {'a': 8, 'b': 26, 'c': 18}, {'a': 8, 'b': 27, 'c': 19}, {'a': 8, 'b': 28, 'c': 20}, {'a': 8, 'b': 29, 'c': 21}, {'a': 8, 'b': 30, 'c': 22}, {'a': 8, 'b': 31, 'c': 23}, {'a': 9, 'b': 25, 'c': 16}, {'a': 9, 'b': 24, 'c': 17}, {'a': 9, 'b': 27, 'c': 18}, {'a': 9, 'b': 26, 'c': 19}, {'a': 9, 'b': 29, 'c': 20}, {'a': 9, 'b': 28, 'c': 21}, {'a': 9, 'b': 31, 'c': 22}, {'a': 9, 'b': 30, 'c': 23}, {'a': 10, 'b': 26, 'c': 16}, {'a': 10, 'b': 27, 'c': 17}, {'a': 10, 'b': 24, 'c': 18}, {'a': 10, 'b': 25, 'c': 19}, {'a': 10, 'b': 30, 'c': 20}, {'a': 10, 'b': 31, 'c': 21}, {'a': 10, 'b': 28, 'c': 22}, {'a': 10, 'b': 29, 'c': 23}, {'a': 11, 'b': 27, 'c': 16}, {'a': 11, 'b': 26, 'c': 17}, {'a': 11, 'b': 25, 'c': 18}, {'a': 11, 'b': 24, 'c': 19}, {'a': 11, 'b': 31, 'c': 20}, {'a': 11, 'b': 30, 'c': 21}, {'a': 11, 'b': 29, 'c': 22}, {'a': 11, 'b': 28, 'c': 23}, {'a': 12, 'b': 28, 'c': 16}, {'a': 12, 'b': 29, 'c': 17}, {'a': 12, 'b': 30, 'c': 18}, {'a': 12, 'b': 31, 'c': 19}, {'a': 12, 'b': 24, 'c': 20}, {'a': 12, 'b': 25, 'c': 21}, {'a': 12, 'b': 26, 'c': 22}, {'a': 12, 'b': 27, 'c': 23}, {'a': 13, 'b': 29, 'c': 16}, {'a': 13, 'b': 28, 'c': 17}, {'a': 13, 'b': 31, 'c': 18}, {'a': 13, 'b': 30, 'c': 19}, {'a': 13, 'b': 25, 'c': 20}, {'a': 13, 'b': 24, 'c': 21}, {'a': 13, 'b': 27, 'c': 22}, {'a': 13, 'b': 26, 'c': 23}, {'a': 14, 'b': 30, 'c': 16}, {'a': 14, 'b': 31, 'c': 17}, {'a': 14, 'b': 28, 'c': 18}, {'a': 14, 'b': 29, 'c': 19}, {'a': 14, 'b': 26, 'c': 20}, {'a': 14, 'b': 27, 'c': 21}, {'a': 14, 'b': 24, 'c': 22}, {'a': 14, 'b': 25, 'c': 23}, {'a': 15, 'b': 31, 'c': 16}, {'a': 15, 'b': 30, 'c': 17}, {'a': 15, 'b': 29, 'c': 18}, {'a': 15, 'b': 28, 'c': 19}, {'a': 15, 'b': 27, 'c': 20}, {'a': 15, 'b': 26, 'c': 21}, {'a': 15, 'b': 25, 'c': 22}, {'a': 15, 'b': 24, 'c': 23}, {'a': 0, 'b': 31, 'c': 31}, {'a': 0, 'b': 32, 'c': 32}, {'a': 1, 'b': 33, 'c': 32}, {'a': 0, 'b': 33, 'c': 33}, {'a': 0, 'b': 34, 'c': 34}, {'a': 1, 'b': 35, 'c': 34}, {'a': 0, 'b': 35, 'c': 35}, {'a': 0, 'b': 36, 'c': 36}, {'a': 1, 'b': 37, 'c': 36}, {'a': 0, 'b': 37, 'c': 37}, {'a': 0, 'b': 38, 'c': 38}, {'a': 1, 'b': 39, 'c': 38}, {'a': 0, 'b': 39, 'c': 39}, {'a': 0, 'b': 40, 'c': 40}, {'a': 1, 'b': 41, 'c': 40}, {'a': 2, 'b': 34, 'c': 32}, {'a': 2, 'b': 35, 'c': 33}, {'a': 2, 'b': 38, 'c': 36}, {'a': 2, 'b': 39, 'c': 37}, {'a': 3, 'b': 35, 'c': 32}, {'a': 3, 'b': 34, 'c': 33}, {'a': 3, 'b': 39, 'c': 36}, {'a': 3, 'b': 38, 'c': 37}, {'a': 4, 'b': 36, 'c': 32}, {'a': 4, 'b': 37, 'c': 33}, {'a': 4, 'b': 38, 'c': 34}, {'a': 4, 'b': 39, 'c': 35}, {'a': 5, 'b': 37, 'c': 32}, {'a': 5, 'b': 36, 'c': 33}, {'a': 5, 'b': 39, 'c': 34}, {'a': 5, 'b': 38, 'c': 35}, {'a': 6, 'b': 38, 'c': 32}, {'a': 6, 'b': 39, 'c': 33}, {'a': 6, 'b': 36, 'c': 34}, {'a': 6, 'b': 37, 'c': 35}, {'a': 7, 'b': 39, 'c': 32}, {'a': 7, 'b': 38, 'c': 33}, {'a': 7, 'b': 37, 'c': 34}, {'a': 7, 'b': 36, 'c': 35}, {'a': 8, 'b': 40, 'c': 32}, {'a': 8, 'b': 41, 'c': 33}, {'a': 9, 'b': 41, 'c': 32}, {'a': 9, 'b': 40, 'c': 33}, {'a': 10, 'b': 40, 'c': 34}, {'a': 10, 'b': 41, 'c': 35}, {'a': 11, 'b': 41, 'c': 34}, {'a': 11, 'b': 40, 'c': 35}, {'a': 12, 'b': 40, 'c': 36}, {'a': 12, 'b': 41, 'c': 37}, {'a': 13, 'b': 41, 'c': 36}, {'a': 13, 'b': 40, 'c': 37}, {'a': 14, 'b': 40, 'c': 38}, {'a': 14, 'b': 41, 'c': 39}, {'a': 15, 'b': 41, 'c': 38}, {'a': 15, 'b': 40, 'c': 39}];
  var params_ = {};

  /** 
   * 게임을 시작한다. 
   * @param {String} mode 게임의 난이도
   * @param {Number} stage 게임의 판을 의미
   */
  function start(mode, stage) {    
    params_.mode = mode;
    params_.stage = stage;    
    params_.marbles = Marbles.get(mode, stage);
    params_.totalStage = Marbles.getTotalStage(mode);

    Game.render(params_, {
      onagain: onagain_, 
      ongo: ongo_,
      onmove: onmove_,
      onmachineturn: onmachineturn_,
      onnext: onnext_,
      onback: onback_
    });
  }

  /** 
   * 게임 다시하기 콜백 함수.
   */
  function onagain_() {
    Game.render(params_, {
      onagain: onagain_, 
      ongo: ongo_,
      onmove: onmove_,
      onmachineturn: onmachineturn_,
      onnext: onnext_,
      onback: onback_
    });
  }

  /** 
   * go 버튼 콜백 함수.
   */
  function ongo_() {
    Audio.playButton();
  }

  /** 
   * 구슬 이동 콜백 함수.
   */
  function onmove_() {
    Audio.playMarble();
  }

  /** 
   * CPU 턴 콜백 함수.
   * @param {Array} marbles 구슬 개수
   * @return {Object} heapIndex 구슬을 조작할 heap 인텍스
   *                  marble 구슬 개수
   *                  null이면 사용자가 승리한 것을 의미한다.
   */
  function onmachineturn_(marbles) {    
    if (marbles[0] + marbles[1] + marbles[2] == 1) {
      return null;
    }

    var tmpMarbles = JSON.parse(JSON.stringify(marbles));
    for (var i = 0; i < tmpMarbles.length; i++) {
      var marble = tmpMarbles[i];
      for (var j = 0; j < marble; j++) {
        tmpMarbles[i] -= 1;
        console.log(tmpMarbles);

        // 테이블에서 이기는 구슬 수를 찾은 경우
        if (isWin_({a: tmpMarbles[0], b: tmpMarbles[1], c: tmpMarbles[2]})) {          
          console.log('found ' + tmpMarbles + ', heapIndex: ' + i + ', marble: ' + tmpMarbles[i]);

          return {
            heapIndex: i,
            marble: tmpMarbles[i]
          };
        }
      }

      tmpMarbles[i] = marble;
    }

    // 테이블에서 이기는 구슬 개수를 찾지 못한 경우, 랜덤한 개수를 생성한다.
    var current = {a: marbles[0], b: marbles[1], c: marbles[2],};
    var random = getRandomHeap_({a: tmpMarbles[0], b: tmpMarbles[1], c: tmpMarbles[2]});
    var heapIndex = 0;
    var marble = 0;

    if (current.a != random.a) {
      heapIndex = 0;
      marble = random.a;
    } else if (current.b != random.b) {
      heapIndex = 1;
      marble = random.b;
    } else if (current.c != random.c) {
      heapIndex = 2;
      marble = random.c;
    }

    return {
      heapIndex: heapIndex,
      marble: marble
    };
  }

  /** 
   * 다음판 콜백 함수.
   */
  function onnext_() {
    switch (params_.mode) {
      case 'easy':
        if (params_.stage < params_.totalStage) {
          params_.stage = params_.stage + 1;
        } else {
          params_.mode = 'normal';
          params_.stage = 1;
          params_.totalStage = Marbles.getTotalStage(params_.mode);
        }
        break;
      case 'normal':
        if (params_.stage < params_.totalStage) {
          params_.stage = params_.stage + 1;          
        } else {
          params_.mode = 'hard';
          params_.stage = 1;
          params_.totalStage = Marbles.getTotalStage(params_.mode); 
        }
        break;
      case 'hard':
        if (params_.stage < params_.totalStage) {
          params_.stage = params_.stage + 1;
        }
        break; 
    }

    // 로컬 스토리지에 현재 난이도, 최고 난이도, 판 저장
    var highestStage = localStorage.getItem('highestStage');
    var highestMode = localStorage.getItem('highestMode');

    localStorage.mode = params_.mode;

    if (params_.stage > highestStage && highestMode == params_.mode) {
      localStorage.highestStage = params_.stage;
    }
    
    if (params_.mode == 'normal' && highestMode == 'easy') {
      localStorage.highestMode = params_.mode;
      localStorage.highestStage = 1;
    } else if (params_.mode == 'hard' && highestMode == 'normal') {
      localStorage.highestMode = params_.mode;
      localStorage.highestStage = 1;
    }      

    params_.marbles = Marbles.get(params_.mode, params_.stage);    

    Game.render(params_, {
      onagain: onagain_, 
      ongo: ongo_,
      onmove: onmove_,
      onmachineturn: onmachineturn_,
      onnext: onnext_,
      onback: onback_
    });
  }

  /** 
   * back 버튼 콜백 함수.
   */
  function onback_() {
    require(['controller/stage'], function(Stage){
      Stage.start();
    });
  }

  /** 
   * 힙을 임의로 생성한다.
   * @param {Object} heap 원본 힙
   * @return {Object} heap 임의 생성된 힙
   */
  function getRandomHeap_(heap) {
    var heap = JSON.parse(JSON.stringify(heap));
    var available = availableHeap_(heap);  
    if (available.length == 0) {
      console.log('[Exception] array is empty!');
      return heap;
    }

    var index = getRandomInt_(0, available.length - 1);
    if (available[index] == 0) {
      heap.a -= getRandomInt_(1, heap.a);
    } else if (available[index] == 1) {
      heap.b -= getRandomInt_(1, heap.b);
    } else {
      heap.c -= getRandomInt_(1, heap.c);
    }
    
    console.log('[getRandomHeap_] ' + heap.a + ' ' + heap.b + ' ' + heap.c);
    return heap;
  }

  /** 
   * 구슬 개수를 판단해 조작할 수 있는 힙의 인덱스를 반환한다.
   * @param {Object} heap 원본 힙
   * @return {Array} available 조작할 수 있는 힙의 인덱스 배열
   */
  function availableHeap_(heap) {
    var available = [];
    if (heap.a != 0) {
      available.push(0);
    }

    if (heap.b != 0) {
      available.push(1);
    }

    if (heap.c != 0) {
      available.push(2);
    }

    return available;
  }

  /** 
   * 이기는 heap인지를 판별한다.
   * @param {Object} heap 원본 힙
   * @return {Boolean} 승리 여부
   */
  function isWin_(heap) {
    var result = false;

    for (var i = 0; i < winHeaps_.length; i++) {
      var result = equals({a: heap.a, b: heap.b, c: heap.c}, winHeaps_[i]);
      if (result == true) {
        break;
      }

      result = equals({a: heap.a, b: heap.c, c: heap.b}, winHeaps_[i]);
      if (result == true) {
        break;
      }

      result = equals({a: heap.b, b: heap.a, c: heap.c}, winHeaps_[i]);
      if (result == true) {
        break;
      }

      result = equals({a: heap.b, b: heap.c, c: heap.a}, winHeaps_[i]);
      if (result == true) {
        break;
      }

      result = equals({a: heap.c, b: heap.a, c: heap.b}, winHeaps_[i]);
      if (result == true) {
        break;
      }

      result = equals({a: heap.c, b: heap.b, c: heap.a}, winHeaps_[i]);
      if (result == true) {
        break;
      }
    }

    return result;
  }

  /** 
   * 두 객체를 비교한다.
   * @param {Object} obj1, obj2 비교할 객체
   * @return {Boolean} 비교 결과
   */
  function equals(obj1, obj2) {
    function _equals(obj1, obj2) {
        return JSON.stringify(obj1)
            === JSON.stringify($.extend(true, {}, obj1, obj2));
    }
    return _equals(obj1, obj2) && _equals(obj2, obj1);
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

  return {
  	start: start
  };
});