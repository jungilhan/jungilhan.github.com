define(['constants', 'controller/player'], function(Constants, Player) {
  var userId_ = '';
  var loggedIn_ = false;
  var scopes_ = 'https://www.googleapis.com/auth/games';
  var oncompleted_ = null;

  function loadClient_() {
    // Load up /games/v1
    gapi.client.load('games','v1',function(response) {
      console.log('games: ' + response);
      Player.load(oncompleted_);
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
    if (auth) {
      console.log('Hooray! You\'re logged in!');      
      loadClient_();

    } else {
      console.log('Please login!');
      if (oncompleted_ != null) {
        oncompleted_({
          name: '',
          profileUrl: '',
          userId: '',
          success: false
       });
      }
    }
  }

  function silent(oncompleted) {
    console.log('Trying silent auth');
    oncompleted_ = oncompleted;
    window.setTimeout(function() {
      gapi.auth.authorize({client_id: Constants.clientId(), scope: scopes_, immediate: true}, handleAuthResult_);
    }, 10);  
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