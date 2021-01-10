const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser, updateUser } = require("../controllers/users.controller");
const { validateInputs } = require("../middlewares/validate-inputs.middleware");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validateInputs,
  ],
  createUser
);
router.put(
  "/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    // check("role", "El role es obligatorio").not().isEmpty(),
    validateInputs,
  ],
  updateUser
);

module.exports = router;
