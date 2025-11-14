const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Crear categoría
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });

  db.query(
    'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
    [nombre, descripcion || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Categoría creada', id: result.insertId });
    }
  );
});

// 2. Obtener todas las categorías
router.get('/', (req, res) => {
  db.query('SELECT * FROM categorias', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3. Obtener una categoría por ID (con sus productos)
router.get('/:id', (req, res) => {
  const categoriaId = req.params.id;

  db.query('SELECT * FROM categorias WHERE id = ?', [categoriaId], (err, catRows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (catRows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });

    const categoria = catRows[0];

    db.query('SELECT * FROM productos WHERE categoria_id = ?', [categoriaId], (err, prodRows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ categoria, productos: prodRows });
    });
  });
});

// 4. Actualizar categoría
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion } = req.body;
  if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });

  db.query(
    'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
    [nombre, descripcion || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json({ message: 'Categoría actualizada' });
    }
  );
});


// 5. Eliminar categoría
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM categorias WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada (y productos asociados también)' });
  });
});

module.exports = router;
