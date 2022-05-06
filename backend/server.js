const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
// 1er méthode :
// const useRoutes = require("./routes/user");
// app.use("/", useRoutes);
//2 eme methode :
const { readdirSync, copyFileSync } = require("fs"); //Pour lire tous les fichiers d'un folder
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//Database :
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
