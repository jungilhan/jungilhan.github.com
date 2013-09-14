define(function() {
   /** 
   * 게임의 구슬 개수를 반환한다.
   * @param {String} mode 난이도 
   * @param {Number} stage 판을 의미(1, 2, 3...)
   * @return {Array} 구슬 개수
   */
  function get(mode, stage) {
    var marbles = [];

    switch (mode) {
      case 'easy':
        marbles = getEasy_(stage);
        break;
      case 'normal':
        marbles = getNormal_(stage);
        break;
      case 'hard':
        marbles = getHard_(stage);
        break;
    }

    return marbles;
  }  

   /** 
   * 난이도 별 게임의 판 개수를 반환한다.
   * @param {String} mode 난이도 
   * @param {Number} stage 판을 의미(1, 2, 3...)
   * @return {Number} 해당 난이도의 총 판 개수
   */
  function getTotalStage(mode) {
    var total = 0;

    switch (mode) {      
      case 'easy':
        total = 25;
        break;
      case 'normal':
      case 'hard':
        total = 30;
        break;
    }
    
    return total;
  }

  /**
   * Easy 난이도의 구슬 개수를 반환한다.
   * @param {Number} stage 판을 의미(1, 2, 3...)
   */
  function getEasy_(stage) {
    switch (stage) {
      case 1:
        return [0, 1, 4];
      case 2:
        return [0, 2, 5];
      case 3:
        return [0, 3, 4];
      case 4:
        return [0, 3, 6];
      case 5:
        return [0, 4, 5];
      case 6:
        return [1, 1, 2];
      case 7:
        return [1, 1, 5];
      case 8:
        return [1, 2, 2];
      case 9:
        return [1, 2, 4];
      case 10:
        return [1, 2, 6];
      case 11:
        return [1, 2, 7];
      case 12:
        return [1, 3, 3];
      case 13:
        return [1, 3, 4];
      case 14:
        return [1, 3, 5];
      case 15:
        return [1, 3, 6];
      case 16:
        return [1, 3, 7];
      case 17:
        return [1, 4, 4];
      case 18:
        return [1, 4, 7];
      case 19:
        return [1, 4, 8];
      case 20:
        return [1, 5, 6];
      case 21:
        return [2, 3, 4];
      case 22:
        return [2, 4, 9];
      case 23:
        return [2, 5, 6];
      case 24:
        return [2, 5, 8];
      case 25:
        return [2, 6, 7];
    }
  }

  /** 
   * Normal 난이도의 구슬 개수를 반환한다.
   * @param {Number} stage 판을 의미(1, 2, 3...)
   */
  function getNormal_(stage) {
    switch (stage) {
      case 1:
        return [3, 4, 6];
      case 2:
        return [3, 4, 8];
      case 3:
        return [3, 5, 8];
      case 4:
        return [3, 6, 7];
      case 5:
        return [4, 5, 6];
      case 6:
        return [4, 5, 7];
      case 7:
        return [4, 6, 7];
      case 8:
        return [4, 7, 9];
      case 9:
        return [4, 8, 10];
      case 10:
        return [4, 9, 10];
      case 11:
        return [5, 6, 7];
      case 12:
        return [5, 8, 11];
      case 13:
        return [5, 8, 12];
      case 14:
        return [5, 8, 10];
      case 15:
        return [5, 9, 10];
      case 16:
        return [5, 9, 11];
      case 17:
        return [5, 9, 13];
      case 18:
        return [6, 8, 9];
      case 19:
        return [6, 8, 11];
      case 20:
        return [6, 8, 12];
      case 21:
        return [6, 8, 13];
      case 22:
        return [6, 9, 10];
      case 23:
        return [6, 9, 12];
      case 24:
        return [6, 9, 13];
      case 25:
        return [7, 8, 10];
      case 26:
        return [7, 8, 13];
      case 27:
        return [7, 8, 14];
      case 28:
        return [7, 9, 10];
      case 29:
        return [7, 9, 11];
      case 30:
        return [7, 9, 15];
    }
  }

  function getHard_(stage) {
    switch (stage) {
      case 1:
        return [8, 10, 11];
      case 2:
        return [8, 10, 13];
      case 3:
        return [8, 11, 12];
      case 4:
        return [8, 12, 14];
      case 5:
        return [8, 13, 15];
      case 6:
        return [9, 10, 12];
      case 7:
        return [9, 10, 13];
      case 8:
        return [9, 10, 14];
      case 9:
        return [9, 10, 15];        
      case 10:
        return [9, 11, 12];
      case 11:
        return [9, 11, 13];
      case 12:
        return [9, 11, 14];
      case 13:
        return [9, 11, 15];
      case 14:
        return [9, 12, 14];
      case 15:
        return [9, 12, 15];
      case 16:
        return [9, 13, 14];
      case 17:
        return [10, 12, 13];
      case 18:
        return [10, 12, 14];
      case 19:
        return [10, 13, 14];
      case 20:
        return [10, 13, 15];
      case 21:
        return [10, 13, 14];
      case 22:
        return [10, 14, 17];
      case 23:
        return [10, 16, 20];
      case 24:
        return [10, 16, 21];
      case 25:
        return [10, 16, 22];
      case 26:
        return [11, 12, 14];
      case 27:
        return [11, 13, 15];
      case 28:
        return [11, 12, 15];
      case 29:
        return [11, 13, 14];
      case 30:
        return [11, 16, 18];      
    }
  }

  return {
  	get: get,
    getTotalStage: getTotalStage
  };
});

