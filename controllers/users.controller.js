const { response } = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/users.model");

const getUsers = async (req, res) => {
  const users = await User.find({}, "name mail role google");

  res.json({
    ok: true,
    users,
  });
};

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty())
    return res.status(400).json({ ok: false, errors: errors.mapped() });

  try {
    const existEmail = await User.findOne({ email });

    if (existEmail)
      return res
        .status(400)
        .json({ ok: false, msg: "El correo ya esta registrado" });

    const user = new User(req.body);
    await user.save();

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error inesperado, revisa logs" });
  }
};

module.exports = {
  getUsers,
  createUser,
};
