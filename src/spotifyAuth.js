export const spotifyAuth = () => {
  var stateKey = "spotify_auth_state";

  function generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  var client_id = "a7c8c4d60a794d498adb10b444f50f44";
  var redirect_uri = "https://zenojammming.netlify.app";

  var state = generateRandomString(16);

  localStorage.setItem(stateKey, state);
  var scope =   `playlist-read-private 
                playlist-read-collaborative 
                playlist-modify-public 
                playlist-modify-private
                user-read-private
                user-read-email
                `;

  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);
  
  window.location = url;
  console.log(url);
};
