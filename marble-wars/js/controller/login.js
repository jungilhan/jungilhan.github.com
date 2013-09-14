define(['constants'/*, 'lib/google-game-api/gapi-chrome-apps'*/], function(Constants) {
  var userId_ = '';
  var loggedIn_ = false;
  var scopes_ = 'https://www.googleapis.com/auth/games';

  function loadClient_() {
    // Load up /games/v1
    gapi.client.load('games','v1',function(response) {

    });

    // Load up v1management
    gapi.client.load('gamesManagement','v1management', function(response) {
      
    });

    // Load up /plus/v1
    gapi.client.load('plus','v1', function(response) {
      
    });
  }

  function handleAuthResult_(auth) {
    console.log('We are in handle auth result');
    if (auth) {
      console.log('Hooray! You\'re logged in!');
      loadClient_();

    } else {
      console.log('Please login!');
    }
  }

  function silent() {
    console.log('Trying silent auth');
    window.setTimeout(function() {
      gapi.auth.authorize({client_id: Constants.clientId(), scope: scopes_, immediate: true}, handleAuthResult_);
    }, 1);  
  }

  function showDialog() {
    gapi.auth.authorize({client_id: Constants.clientId(), scope: scopes_, immediate: false}, handleAuthResult_);
  }

  return {
    showDialog: showDialog,
    silent: silent
  };
});