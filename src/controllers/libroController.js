const Libro = require("../models/libroModel");

exports.getAllLibros = async (req, res, next) => {
  try {
    const libros = await Libro.find();
    res.status(200).json(libros);
  } catch (error) {
    next(error);
  }
};

exports.getLibroById = async (req, res, next) => {
  try {
    const libro = await Libro.findById(req.params.id);
    
    res.status(200).json(libro);
  } catch (error) {
    next(error);   
  }
};

exports.createLibro = async (req, res, next) => {
  try {
    const nuevoLibro = await Libro.create(req.body);
    await nuevoLibro.save();
    res.status(201).json(nuevoLibro);
  } catch (error) {
    next(error);
  }
};

exports.updateLibro = async (req, res, next) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.status(200).json(libro);
  } catch (error) {
    next(error);
  }
};

exports.deleteLibro = async (req, res, next) => {
  try {
    const libroId = req.params.id;
    if(!libroId){
      const error = new error("Libro no encontrado");
      error.status = 401;
      throw(error);
    }
    const libroEliminado = await Libro.findByIdAndRemove(libroId);

    res.status(200).json(libroEliminado);
  } catch (error) {
    next(error);
  }
};
