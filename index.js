const express = require("express");
require("dotenv").config();
const cors = require('cors');

const { dbConnection } = require("./database/config");

const app = express();

// Configurar cors
app.use(cors());

// Base de datos
dbConnection();

// Rutas
app.use("/api/users", require('./routes/users.route'));


app.listen(process.env.PORT, () => {
  console.log("Servidor Corriendo en puerto", process.env.PORT);
});
