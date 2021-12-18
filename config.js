require("dotenv").config();

const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
const port = process.env.PORT;
const redirectUri = process.env.REDIRECT_URI;

module.exports = {
  clientId,
  clientSecret,
  redirectUri,
  port,
};
