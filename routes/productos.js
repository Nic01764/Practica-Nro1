const express = require('express');
const router = express.Router();
const db = require('../db');

// 6. Crear producto
router.post('/', (req, res) => {
  const { nombre, descripcion, precio, stock, categoria_id } = req.body;

  if (!nombre || !precio || !categoria_id) {
    return res.status(400).json({ error: 'nombre, precio y categoria_id son requeridos' });
  }

  const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion || null, precio, stock || 0, categoria_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Producto creado', id: result.insertId });
  });
});

// 7. Obtener todos los productos
router.get('/', (req, res) => {
  const sql = `
    SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, c.nombre AS categoria
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


module.exports = router;
// 8. obtener producto por su ID
router.get(`/:id`,(req,res)=>{
  const id = req.params.id;

  const sql=`
  SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, c.nombre AS categoria
  FROM productos p
  LEFT JOIN categorias c ON p.categoria_id=c.id
  WHERE p.id=?
  `;
  db.query(sql,[id],(err,results)=>{
    if(err)return res.status(500).json({error:err.message});
    if (results.length==0)return res.status(404).json({error:`producto no encontrado`});
    res.json(results[0]);
  });
})
// 9. Actualizar un producto
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;

    if (!nombre || !precio || !categoria_id) {
        return res.status(400).json({ error: 'nombre, precio y categoria_id son requeridos' });
    }

    const sql = `
        UPDATE productos
        SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ?
        WHERE id = ?
    `;

    db.query(sql, [nombre, descripcion || null, precio, stock || 0, categoria_id, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado correctamente' });
    });
});
// 10. Actualizar el stock de un producto
router.patch('/:id/stock', (req, res) => {
  const id = req.params.id;
  const { cantidad } = req.body;

  if (typeof cantidad !== 'number') {
    return res.status(400).json({ error: 'Debes enviar un número en "cantidad"' });
  }
  db.query('SELECT stock FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });

      const stockActual = results[0].stock;
      const nuevoStock = stockActual + cantidad;

        if (nuevoStock < 0) {
          return res.status(400).json({ error: 'El stock no puede ser negativo' });
        }
    db.query('UPDATE productos SET stock = ? WHERE id = ?', [nuevoStock, id], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ message: 'Stock actualizado correctamente', stockAnterior: stockActual, stockNuevo: nuevoStock });
        });
    });
});
