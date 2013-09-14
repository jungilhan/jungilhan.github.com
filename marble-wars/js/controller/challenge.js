define(['controller/player'], function(Player) { 
  function generate(mode, stage) {
    return {mode: mode, stage: stage, user: Player.name()};
  }

  return {
    generate: generate
  };
});