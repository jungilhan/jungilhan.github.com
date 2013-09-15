define(['constants', 'controller/player'], function(Constants, Player) {
  var userId_ = '';
  var loggedIn_ = false;
  var scopes_ = 'https://www.googleapis.com/auth/games';
  var oncompleted_ = null;

  function loadClient_() {
    // Load up /games/v1
    gapi.client.load('games','v1',function(response) {
      console.log('games: ' + response);
      Player.load();
    });

    // Load up v1management
    gapi.client.load('gamesManagement','v1management', function(response) {
      console.log('gamesManagement: ' + response);
    });

    // Load up /plus/v1
    gapi.client.load('plus','v1', function(response) {
      console.log('plus: ' + response);
    });
  }

  function handleAuthResult_(auth) {
    console.log('We are in handle auth result');
    var success = true;

    if (auth) {
      console.log('Hooray! You\'re logged in!');      
      loadClient_();

    } else {
      console.log('Please login!');
      success = false;
    }

    if (oncompleted_ != null) {
      oncompleted_({
        name: Player.name(),
        profileUrl: Player.profileUrl(),
        userId: Player.userId(),
        success: success
       });
    }
  }

  function silent(oncompleted) {
    console.log('Trying silent auth');
    oncompleted_ = oncompleted;
    window.setTimeout(function() {
      gapi.auth.authorize({client_id: Constants.clientId(), scope: scopes_, immediate: true}, handleAuthResult_);
    }, 1);  
  }

  function showDialog(oncompleted) {
    oncompleted_ = oncompleted;
    gapi.auth.authorize({client_id: Constants.clientId(), scope: scopes_, immediate: false}, handleAuthResult_);
  }

  return {
    showDialog: showDialog,
    silent: silent
  };
});