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
      // city: faker.location.cityName(),
      city: 'Retalhuleu',
      // country: faker.location.country({ full: true }),
      country: 'Guatemala',
      superHost: faker.datatype.boolean(),
      title: faker.lorem.sentence(),
      rating: faker.datatype.number(5),
      maxGuests: faker.datatype.number(10),
      type: faker.lorem.word(),
      beds: faker.datatype.number(10),
      photo: faker.image.imageUrl(640, 480, 'city', true),
    });
  }
  res.json(itemPrueba); // genera un json con los productos de la base de datos
});
// para obtener un dato con un query se utuliza el signo de interrogacion
// http://localhost:3000/api/v1/pruebas?size=100

module.exports = router; // exportamos el router
