$('.btn-login').click(function() {
  $.ajax({
    type: 'POST',
    url: //'https://<your-auth0-acount>.auth0.com/oauth/ro',
    data: {
      client_id: // your-auth0-client-id,
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value,
      grant_type: 'password',
      scope: 'openid',
      connection:'Username-Password-Authentication'
    },
    success: function(data) {
      getJwtCookie(data.id_token);
    },
    error: function(error) {
      console.log('There was an error: ' + error)
    }

  });
});

function getJwtCookie(token) {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3001/secured/authorize-cookie',
    data: {
      token: token
    },
    headers: {
      'Authorization' : 'Bearer ' + token
    },
    success: function() {
      console.log('Cookie received!');
    },
    error: function() {
      console.log('Problem with cookie');
    }
  });
}