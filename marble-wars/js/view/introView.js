define(['config', 'lib/collie'], function(Config) {
  /** @private */
  var width_ = Config.width();
  var height_ = Config.height();
  var oncomplete_ = null;

  /** 
   * View 렌더 함수.
   * @param {Object} oncomplete 인트로 애니메이션 완료 콜백
   */
  function render(oncomplete) {
    oncomplete_ = oncomplete;
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
    setAnimation_(displayObjects);

    collie.Renderer.addLayer(layer);
    collie.Renderer.load(document.getElementById('intro'));
    collie.Renderer.start();
  }

  /** 
   * 레이어에 객체를 추가한다. 
   * @param {Object} layer 레이어
   * @return {Object} 레이어에 추가된 객체
   */
  function addDisplayObjects_(layer) {
    new collie.DisplayObject({
      backgroundImage: 'background'
    }).addTo(layer);

    new collie.DisplayObject({
      x: (width_ / 2) - (236 / 2),
      y: 420,
      backgroundImage: 'introCopyright'
    }).addTo(layer);

    var title = new collie.DisplayObject({
      x: 151,
      y: -248,
      backgroundImage: 'introTitle'
    }).addTo(layer);

    var marbleSmallLeft = new collie.DisplayObject({
      x: -245,
      y: -85,
      backgroundImage: 'introMarbleSmall'
    }).addTo(layer);

    var marbleSmallRight = new collie.DisplayObject({
      x: width_,
      y: 150,
      backgroundImage: 'introMarbleSmall'
    }).addTo(layer);

    var marbleLarge = new collie.DisplayObject({
      x: width_,
      y: 270,
      backgroundImage: 'introMarbleLarge'
    }).addTo(layer);        

    return {
      title: title,
      marbleSmallLeft: marbleSmallLeft,
      marbleSmallRight: marbleSmallRight,
      marbleLarge: marbleLarge
    }
  }

  /** 
   * 레이어에 객체를 추가한다. 
   * @param {Object} displayObjects 화면에 보여지는 객체 집합
   */
  function setAnimation_(displayObjects) {
    var show = collie.Timer.timeline();

    show.add(0, 'transition', displayObjects.title, 500, {
      effect: collie.Effect.easeIn,
      set: 'y',
      to: 80
    });

    show.add(400, 'transition', displayObjects.marbleSmallLeft, 300, {
      effect: collie.Effect.easeIn,
      set: 'x',
      to: -70
    });

    show.add(700, 'transition', displayObjects.marbleSmallRight, 500, {
      effect: collie.Effect.easeIn,
      set: 'x',
      to: 650
    });

    show.add(900, 'transition', displayObjects.marbleLarge, 500, {
      effect: collie.Effect.easeIn,
      set: 'x',
      to: 590
    });

    var hide = collie.Timer.timeline();

    hide.add(1500, 'transition', displayObjects.title, 400, {
      effect: collie.Effect.easeOut,
      set: 'y',
      to: -248
    });

    hide.add(1800, 'transition', displayObjects.marbleSmallLeft, 300, {
      effect: collie.Effect.easeOut,
      set: 'x',
      to: -245
    });

    hide.add(2100, 'transition', displayObjects.marbleSmallRight, 500, {
      effect: collie.Effect.easeOut,
      set: 'x',
      to: width_
    });

    hide.add(2100, 'transition', displayObjects.marbleLarge, 500, {
      effect: collie.Effect.easeOut,
      set: 'x',
      to: width_
    });

    hide.add(2350, 'delay', function() {
      var layer = displayObjects.title.getLayer();
      layer.getElement().style.visibility = 'hidden';

      if (oncomplete_) {
        oncomplete_();

        delete displayObjects.title;
        delete displayObjects.marbleSmallLeft;
        delete displayObjects.marbleSmallRight;
        delete displayObjects.marbleLarge;

        for (var object in displayObjects) {
          console.log(object);
        }
      }
    }, 500);
  }

  return {
  	render: render
  };
});