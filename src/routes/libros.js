const express = require("express");
const router = express.Router();

const { getAllLibros, getLibroById, createLibro, updateLibro, deleteLibro} = require("../controllers/libroController");


// Importamos la libreria para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

// Ruta para obtener todos los libros
router.get("/", requiredScopes("read:biblioteca"), getAllLibros);

// Ruta para obtener un libro por id
router.get("/:id", requiredScopes("read:biblioteca"), getLibroById);

// Ruta para crear un nuevo Libro
router.post("/", requiredScopes("read:biblioteca"), createLibro);

// Ruta para actualizar un Libro existente
router.put("/:id", requiredScopes("read:biblioteca"), updateLibro);

// Ruta para eliminar un Libro
router.delete("/:id", requiredScopes("read:biblioteca"), deleteLibro);

module.exports = router;
