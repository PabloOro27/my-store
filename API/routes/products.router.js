// aqui se definen los end point de products
const express = require('express'); // importamos express
const router = express.Router(); // creamos una instancia de express
// -----------------------------------------------
// para validacion de datos traemos el middleware y el schema
const validatorHandler = require('../middlewares/validator.handler'); // importamos el middleware de validacion
const {
  createProductsSchema,
  updateProductsSchema,
  getProductsSchema,
} = require('../schemas/products.schema'); // importamos el schema de validacion
// -----------------------------------------------
// creamos una instancia del servicio de productos
const ProductService = require('../services/products.service'); // importamos el servicio de productos
// servicios de la api
const service = new ProductService();
// --------------------RUTAS---------------------------
// ruta products-----------------------------------
router.get('/', async(req, res) => {
  const products = await service.find(); // obtenemos los productos del servicio
  // respondemos con un json con los productos de la base de datos
  res.status(200).json(products);
});
// ruta de products con filter---------------------
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});
// ruta products con id----------------------------
router.get('/:id',
  validatorHandler(getProductsSchema, 'params'), // validamos los datos de entrada
  async(req, res, next) => {
  // comprobamos si existe el producto
  try{
    const { id } = req.params;
    const product = await service.findOne(id); // obtenemos el producto del servicio
    // respondemos con un json con los productos de la base de datos
    res.status(200).json(product);
  }catch(error){
    next(error); // llamamos al middleware de errores con el error
  }
});
// metodo post, ingresar productos-----------------
router.post('/',
  validatorHandler(createProductsSchema, 'body'), // validamos los datos de entrada
  async(req, res, next) => {
  const body = req.body;
  // ingresar producto
  const newProduct = await service.create(
    body.name,
    body.price,
    body.image,
    body.description,
  );
  // para enviarle un status al cliente se utiliza el metodo status
  res.status(201).json({
    message: 'Product created',
    data: body,
  });
});
// metodo patch o put, actualizar productos---------
router.patch('/:id',
  validatorHandler(getProductsSchema, 'params'), // validamos los datos de entrada
  validatorHandler(updateProductsSchema, 'body'), // validamos los datos de entrada
  async(req, res, next) => {
  try{
    const { id } = req.params; // obtenemos el id de los parametros
    const body = req.body; // obtenemos el body
    // actualizamos el producto
    const product = await service.update(id, body);
    // respondemos con un json con los productos de la base de datos
    res.status(202).json(product);

  } catch(error){
    next(error); // llamamos al middleware de errores con el error
  }

});
// metodo delete, eliminar productos---------------
router.delete('/:id',
  validatorHandler(getProductsSchema, 'params'), // validamos los datos de entrada
  async(req, res, next) => {
  try{
    const { id } = req.params;
    // eliminamos el producto
    await service.delete(id);
    res.json({
      message: 'Product deleted',
      id,
    });
  } catch(error){
    next(error); // llamamos al middleware de errores con el error
  }

});


module.exports = router; // exportamos el router
