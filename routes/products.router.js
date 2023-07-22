// aqui se definen los end point de products

const express = require('express');
const {faker} = require('@faker-js/faker'); // importamos faker

const router = express.Router();

// ruta products-----------------------------------
router.get('/', (req, res) => {
  // limite de parametros
  const { size } = req.query;
  const limit = size || 10;

  // generamos datos falsos
  const products = []; // array vacio
  for (let i = 0; i < limit; i++) {
    // recorremos el array y le agregamos datos falsos al array products
    products.push({
      // push agrega un elemento al array
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.url(),
    });
  }
  //genera un json con los productos de la base de datos
  res.json(products);
});
// ruta de products con filter---------------------
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});
// ruta products con id----------------------------
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Producto 1',
    price: 1000,
  });
});


module.exports = router; // exportamos el router
