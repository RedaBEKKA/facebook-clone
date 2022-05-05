const express = require("express");
const app = express();
const cors = require("cors");

// const options = {
//   origin: "http://localhost:3000",
//   useSuccessStatus: 200,
// };
// let allowed = ["http://localhost:3000", "http://localhost:3001"];
// function options(req, res) {
//   let tmp;
//   let origin = req.header("Origin");
//   if (allowed.indexOf(origin) > -1) {
//     tmp = {
//       origin: true,
//       optionSuccessStatus: 200,
//     };
//   } else {
//     tmp = {
//       origin: false,
//     };
//   }
//   res(null, tmp);
// }
app.use(cors());

app.get("/", (req, res) => {
  res.send("Azul from Backend");
});
app.listen(8000, () => {
  console.log("Server is listening..");
});
