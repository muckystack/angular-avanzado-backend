const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateInputs } = require("../middlewares/validate-inputs.middleware");

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validateInputs,
  ],
  login
);

module.exports = router;
