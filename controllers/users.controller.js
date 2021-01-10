const { response } = require("express");
const User = require("../models/users.model");
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  const users = await User.find({}, "name mail role google");

  res.json({
    ok: true,
    users,
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existEmail = await User.findOne({ email });

    if (existEmail)
      return res
        .status(400)
        .json({ ok: false, msg: "El correo ya esta registrado" });

    const user = new User(req.body);
    
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar el usuario
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
