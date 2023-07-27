const express = require('express'); // importamos express
// aqui se definen las rutas de la api
const productsRouter = require('./products.router'); // importamos el router de products
const categoriesRouter = require('./categories.router'); // importamos el router de categories
const usersRouter = require('./users.router'); // importamos el router de users
const pruebasRouter = require('./pruebas.router'); // importamos el router de pruebas

function routerApi(app) {
  // versionado de la api
  const routerV1 = express.Router(); // crea una instancia de express
  app.use('/api/v1', routerV1); // le decimos a express que use el router de la api

  // se cambia a router
  // router.use('/products', productsRouter);
  routerV1.use('/products', productsRouter); // le decimos a express que use el router de products
  routerV1.use('/categories', categoriesRouter); // le decimos a express que use el router de categories
  routerV1.use('/users', usersRouter); // le decimos a express que use el router de users
  routerV1.use('/pruebas', pruebasRouter); // le decimos a express que use el router de pruebas
}

module.exports = routerApi; // exportamos el router
