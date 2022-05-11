const User = require("../models/User");
const {
  validateEmail,
  validationLength,
  validateUsername,
} = require("../helpers/validations");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bDay,
      bMonth,
      bYear,
      gender,
    } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "L'email n'est pas valide",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "L'email existe deja , essayez avec un autre email",
      });
    }

    if (!validationLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "Le nom doit étre entre 3 et 30 caractéres",
      });
    }
    if (!validationLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Le prenom doit étre entre 3 et 30 caractéres",
      });
    }
    if (!validationLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Le mot de passe doit avoir au moin 6 caractére",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bDay,
      bMonth,
      bYear,
      gender,
    }).save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
