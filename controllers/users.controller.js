const { response } = require("express");
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

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

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    // TODO: Validar token y comprobar si es el usuario correcto

    const userDB = await User.findById(uid);
    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (userDB.email !== email) {
      const existEmail = await User.findOne({ email });
      if (existEmail)
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
    }

    campos.email = email;

    const userUpdated = await User.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error inesperado, revisa logs" });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    // TODO: Validar token y comprobar si es el usuario correcto

    const userDB = await User.findById(uid);
    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: 'Usuario eliminado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
