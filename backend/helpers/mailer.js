const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { EMAIL, CLIENT_ID, CLIENT_SECRET, MAILING_REFRESH_TOKEN } = process.env;
const oAuthLink = "https://developers.google.com/oauthplayground";
const auth = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  MAILING_REFRESH_TOKEN,
  oAuthLink
);
exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH_TOKEN,
  });
  const accessToken = auth.getAccessToken();
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
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5999"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="Logo" style="width:30px"><span>Action requise:Activation de votre compte facebook</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Azul ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Vous avez récément créer un compte sur facebook.Pour compléter votre inscription ,veuillez confirmer votre compte</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#faebd7;text-decoration:none;font-weight:600">Confirmer votre compte</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook vous autorise a rester en contact avec tous vos amis.Une fois inscris ,vous pouvez partager vos photos ,organiser des evenements et beaucoups d'autres surprises</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
