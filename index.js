const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");

const app = express();

// Base de datos
dbConnection();

console.log(process.env);

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
