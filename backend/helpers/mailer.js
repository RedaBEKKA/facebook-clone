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

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH_TOKEN,
  });

  const accessToken = auth.accessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: MAILING_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: ``,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) throw err;
    return res;
  });
};
