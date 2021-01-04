const express = require("express");

const app = express();

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Todo bien'
  })
});

app.listen(3000, () => {
  console.log("Servidor Corriendo en puerto 3000");
});
