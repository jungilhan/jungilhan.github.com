define(function() {
  /** 
   * 효과음 설정.
   * @param {Boolean} On/Off 설정
   */
  function set(enable) {
    localStorage.effects = enable;
  }

  /** 
   * 효과음 활성화 여부 반환.
   * @retuen {Boolean} 활성화 
   */
  function isEnabled() {
    var enabled = JSON.parse(localStorage.getItem('effects'));
    if (enabled == null) {
      enabled = true;
    }

    return enabled;
  }

  return {
    set: set,
    isEnabled: isEnabled
  };
});
