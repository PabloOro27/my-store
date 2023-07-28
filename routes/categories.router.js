// las rutas sirver para definir las rutas de la api
const express = require('express'); // importa express
const router = express.Router(); // crea una instancia de express
// servicios de la api
const CategorieService = require('../services/categories.service'); // importamos el servicio de categorias
const service = new CategorieService(); // creamos una instancia del servicio de categorias

// ruta categorias-- ------------------------------
router.get('/', async(req, res) => {
  const categories = await service.find(); // obtenemos los productos del servicio
    // respondemos con un json con los productos de la base de datos
    res.status(200).json(categories);
});
// ruta categorias con id---------------------------
router.get('/:id', async(req, res, next) => {
  // comrpobamos su existe la categoria
  try{
    const { id } = req.params;
    const categories = await service.findOne(id); // obtenemos la categoria del servicio
    // respondemos con un json con los productos de la base de datos
    res.status(200).json(categories);
  }catch(error) {
    next(error); // llamamos al middleware de errores con el error
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
router.post('/', async(req, res) => {
  const body = req.body;
  // ingresar categoria
  await service.create(body.name, body.description);
  // para enviarle un status al cliente se utiliza el metodo status
  res.status(201).json({
    message: 'Category created',
    data: body,
  });
});
// metodo patch o put
router.patch('/:id', async(req, res, next) => {
  try{
    const { id } = req.params; // obtenemos el id de los parametros
    const body = req.body; // obtenemos el body
    // actualizamos la categoria
    const category = await service.update(id, body);
    // respondemos con un json con los productos de la base de datos
    res.status(202).json(category);
  } catch(error) {
    next(error); // llamamos al middleware de errores con el error
  }
});
// metodo delete
router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  // eliminamos la categoria
  await service.delete(id);
  res.json({
    message: 'Category deleted',
    id,
  });
});


module.exports = router; // exportamos el router
