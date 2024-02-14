require('dotenv').config();
const express = require("express");
const { auth } = require('express-oauth2-jwt-bearer');
const errorHandler = require("./middlewares/errorHandler");

// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: 'RS256'
});

const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

// Ruta base
app.get("/", (req, res) => {
  res.send("API de productos");
});


// Ruta base
app.get("/health", (req, res) => {
  res.send("OK");
});

//Configuramos el middleware de autenticacion
app.use("/libros", autenticacion,  librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log(process.env.MONGO_DB)
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = app;