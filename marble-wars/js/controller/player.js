define([], function() { 
  var name_ = '';
  var profileUrl_ = '';
  var userId_ = ''

  function load(oncompleted) {
    var request = gapi.client.games.players.get({playerId: 'me'});
    request.execute(function(response) {
      console.log('This is who you are ', response);

      name_ = response.displayName;
      profileUrl_ = response.avatarImageUrl;
      userId_ = response.playerId;

      if (oncompleted != null) {
        oncompleted_({
          name: name_,
          profileUrl: profileUrl_,
          userId: userId_,
          success: profileUrl_ != '' : true ? false
       });
      }
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