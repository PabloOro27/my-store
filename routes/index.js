const express = require('express'); // importamos express
// aqui se definen las rutas de la api
const productsRouter = require('./products.router'); // importamos el router de products
const categoriesRouter = require('./categories.router'); // importamos el router de categories
const usersRouter = require('./users.router'); // importamos el router de users

function routerApi(app) {
  // versionado de la api
  const router = express.Router(); // crea una instancia de express
  app.use('/api/v1', router); // le decimos a express que use el router de la api

  // se cambia a router
  // router.use('/products', productsRouter);
  router.use('/products', productsRouter); // le decimos a express que use el router de products
  router.use('/categories', categoriesRouter); // le decimos a express que use el router de categories
  router.use('/users', usersRouter); // le decimos a express que use el router de users
}

module.exports = routerApi; // exportamos el router
