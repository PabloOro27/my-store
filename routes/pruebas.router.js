const express = require('express');
const router = express.Router();
// faker
const { faker } = require('@faker-js/faker');

// ruta principal
router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;

  const itemPrueba = []; // array vacio
  // recorremos el array y le agregamos datos falsos al array products
  for (let i = 0; i < limit; i++) {
    itemPrueba.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
    });
  }
  res.json(itemPrueba); // genera un json con los productos de la base de datos
});
// para obtener un dato con un query se utuliza el signo de interrogacion
// http://localhost:3000/api/v1/pruebas?size=100

module.exports = router; // exportamos el router
