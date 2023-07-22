const express = require('express'); // importa express
const router = express.Router(); // crea una instancia de express


// ruta categorias-- ------------------------------
router.get('/', (req, res) => {
  res.json([
    {
      name: 'Categoria 1',
      description: 'Esta es la categoria 1',
    },
    {
      name: 'Categoria 2',
      description: 'Esta es la categoria 2',
    }
  ]);
});
// ruta categorias con id---------------------------
router.get('/:category_id/products/:product_id', (req, res) => {
  const { category_id, product_id } = req.params;
  res.json({
    category_id,
    product_id,
  });
});
// metodo post
router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Category created',
    data: body,
  });
});

module.exports = router; // exportamos el router
