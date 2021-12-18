const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const { clientId, clientSecret, redirectUri, port } = require("./config.js");

app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refershToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri,
    clientId,
    clientSecret,
    refreshToken,
  });
  console.log("refresh");
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  console.log("Login");
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri,
    clientId,
    clientSecret,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
