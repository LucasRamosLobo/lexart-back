// app.js
const express = require("express");
const sequelize = require("./db");
const userRoutes = require("./router/router");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", userRoutes);

// Iniciar o servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
});
