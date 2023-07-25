// aqui se definen los end point de products
const express = require('express'); // importamos express
const router = express.Router(); // creamos una instancia de express
// servicios de la api
const ProductService = require('../services/products.service'); // importamos el servicio de productos
const service = new ProductService(); // creamos una instancia del servicio de productos

// ruta products-----------------------------------
router.get('/', (req, res) => {
  const products = service.find(); // obtenemos los productos del servicio
  // respondemos con un json con los productos de la base de datos
  res.status(200).json(products);
});
// ruta de products con filter---------------------
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});
// ruta products con id----------------------------
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id); // obtenemos el producto del servicio
  if(!product) return res.status(404).json({ message: 'Product not found' });
  else {
    // respondemos con un json con los productos de la base de datos
    res.status(200).json(product);
  }
});
// metodo post, ingresar productos-----------------
router.post('/', (req, res) => {
  const body = req.body;
  // ingresar producto
  const newProduct = service.create(body.name, body.price, body.image, body.description);
  // para enviarle un status al cliente se utiliza el metodo status
  res.status(201).json({
    message: 'Product created',
    data: body,
  });
});
// metodo patch o put, actualizar productos---------
router.patch('/:id', (req, res) => {
  const { id } = req.params; // obtenemos el id de los parametros
  const body = req.body; // obtenemos el body
  // actualizamos el producto
  service.update(id, body);
  // respondemos con un json con los productos de la base de datos
  res.status(202).json({
    message: 'Product updated',
    data: body,
    id,
  });
});
// metodo delete, eliminar productos---------------
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // eliminamos el producto
  service.delete(id);
  res.json({
    message: 'Product deleted',
    id,
  });
});


module.exports = router; // exportamos el router
