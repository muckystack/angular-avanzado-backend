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
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Todo bien",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor Corriendo en puerto", process.env.PORT);
});
