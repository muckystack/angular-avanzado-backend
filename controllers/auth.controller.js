const { response } = require("express");
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt.helper");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar email
    const userDB = await User.findOne({ email });
    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: "Correo o contraseña incorrectos",
      });

    // Verificar contraseña
    const validatePassword = bcrypt.compareSync(password, userDB.password);
    if (!validatePassword)
      return res.status(404).json({
        ok: false,
        msg: "Correo o contraseña incorrectos",
      });

    // Generar el token
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error inesperado, revisa logs" });
  }
};

module.exports = {
  login,
};
