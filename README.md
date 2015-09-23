# Auth0 + NodeJS API Seed + Cookie JWT Authentication

This seed project builds on Auth0's [NodeJS API seed](https://github.com/auth0/node-auth0/tree/master/examples/nodejs-api) and extends it to handle cookies.

```js
// server.js
var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID,
  getToken: function fromHeaderOrCookie(req) {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if(req.cookies && req.cookies.id_token) {
      return req.cookies.id_token;
    }
    return null;
  }
});
```

This is the seed project you need to use if you're going to create a NodeJS API. You'll mostly use this API either for a SPA or a Mobile app. If you just want to create a Regular NodeJS WebApp, please check [this other seed project](https://github.com/auth0/node-auth0/tree/master/examples/nodejs-regular-webapp).

## Running the example

In order to run the example you need to have `npm` and NodeJS installed.

Run `npm install` to ensure local dependencies are available.

You also need to set the ClientSecret and ClientId for your Auth0 app as enviroment variables with the following names respectively: `AUTH0_CLIENT_SECRET` and `AUTH0_CLIENT_ID`.

For that, the following should have been already created for you; if not, just create a file named `.env` in the directory and set the values like the following, the app will just work:

```bash
# .env

AUTH0_CLIENT_SECRET=myCoolSecret
AUTH0_CLIENT_ID=myCoolClientId
```

You need to create a file that calls Auth0's API for a JWT and stores it as a cookie. The example will also handle JWTs sent as `Authorization` headers.
