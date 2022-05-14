const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const { EMAIL, CLIENT_ID, CLIENT_SECRET, MAILING_REFRESH_TOKEN } = process.env;
const oAuthLink = "https://developers.google.com/oauthplayground";
const auth = new OAuth2({
  CLIENT_ID,
  MAILING_REFRESH_TOKEN,
  CLIENT_SECRET,
  oAuthLink,
});
