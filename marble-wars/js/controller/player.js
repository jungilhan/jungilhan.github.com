define([], function() { 
  var name_ = '';
  var profileUrl_ = '';
  var userId_ = ''

  function load() {
    var request = gapi.client.games.players.get({playerId: 'me'});
    request.execute(function(response) {
      console.log('This is who you are ', response);

      name_ = response.displayName;
      profileUrl_ = response.avatarImageUrl;
      userId_ = response.playerId;
    });
  }

  function name() {
    return name_;
  }

  function profileUrl() {
    return profileUrl_;
  }

  function userId() {
    return userId_;
  }

  return {
    load: load,
    name: name,
    profileUrl: profileUrl,
    userId: userId
  };
});