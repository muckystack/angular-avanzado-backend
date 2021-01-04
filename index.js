const express = require("express");
const { dbConnection } = require("./database/config");

const app = express();

// Base de datos
dbConnection();

// Rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Todo bien",
  });
});

app.listen(3000, () => {
  console.log("Servidor Corriendo en puerto 3000");
});
