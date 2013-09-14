define(['lib/buffer-loader', 'model/effects'], function(BufferLoarder, Effects) {
  var context = null;
  var buffers = null;

  /** 
   * Audio 초기화 함수.
   */
  function init() {
    try {
      context =  new webkitAudioContext();
    } catch(e) {
      console.log('Web Audio API is not supported in this browser');
    }

    if (context != null) {
      var bufferLoader = new BufferLoader(context, [
        'sound/click.ogg',
        'sound/marble.ogg'
        ], 
        function(bufferList) {
          buffers = bufferList;
      });
      bufferLoader.load();
    }
  }

  /** 
   * 버튼 클릭 효과음 재생
   */
  function playButton() {
    if (buffers != null && isEffectsEnabled()) {
      playSound(buffers[0]);
    }
  }

  /** 
   * 구슬 가져가기 효과음 재생
   */
  function playMarble() {
    if (buffers != null && isEffectsEnabled()) {
      playSound(buffers[1]);
    }
  }

  /** 
   * 음원을 재생한다. 
   * @param {Object} 재생할 리소스
   */
  function playSound(buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.noteOn(0);
  }

  /** 
   * 효과음 활성화 여부를 반환한다.
   * @return 활성화 여부
   */
  function isEffectsEnabled() {
    var enable = Effects.isEnabled();
    return enable;
  }

  return {
    init: init,
  	playButton: playButton,
    playMarble: playMarble,
    isEffectsEnabled: isEffectsEnabled
  };
});