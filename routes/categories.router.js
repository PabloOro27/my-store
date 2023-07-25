// las rutas sirver para definir las rutas de la api
const express = require('express'); // importa express
const router = express.Router(); // crea una instancia de express
// servicios de la api
const CategorieService = require('../services/categories.service'); // importamos el servicio de categorias
const service = new CategorieService(); // creamos una instancia del servicio de categorias

// ruta categorias-- ------------------------------
router.get('/', (req, res) => {
  const categories = service.find(); // obtenemos los productos del servicio
    // respondemos con un json con los productos de la base de datos
    res.status(200).json(categories);
});
// ruta categorias con id---------------------------
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const categories = service.findOne(id); // obtenemos la categoria del servicio
  if(!categories) return res.status(404).json({ message: 'Category not found' });
  else {
    // respondemos con un json con los productos de la base de datos
    res.status(200).json(categories);
  }
});
// ruta categorias con id y productos con id---------------------------
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
  // ingresar categoria
  const newCategory = service.create(body.name, body.description);
  // para enviarle un status al cliente se utiliza el metodo status
  res.status(201).json({
    message: 'Category created',
    data: body,
  });
});
// metodo patch o put
router.patch('/:id', (req, res) => {
  const { id } = req.params; // obtenemos el id de los parametros
  const body = req.body; // obtenemos el body
  // actualizamos la categoria
  service.update(id, body);
  // respondemos con un json con los productos de la base de datos
  res.status(202).json({
    message: 'Category updated',
    data: body,
    id,
  });
});
// metodo delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // eliminamos la categoria
  service.delete(id);
  res.json({
    message: 'Category deleted',
    id,
  });
});


module.exports = router; // exportamos el router
