const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser } = require("../controllers/users.controller");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
  ],
  createUser
);

module.exports = router;
