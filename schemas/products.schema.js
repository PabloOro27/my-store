// esquema de los productos
const Joi = require('joi'); // importamos joi

// definimos los datos que vamos a validar
const id = Joi.string().min(1).max(3);
const name = Joi.string().min(5).max(100);
const price = Joi.string().min(5).max(15);
const image = Joi.string().uri(); // uri es para validar que sea una url
const description = Joi.string().max(255);

// validacion de create
const createProductsSchema = Joi.object({
  name: name.required(), //el required es para que sea obligatorio
  price: price.required(),
  image: image.required(),
  description: description.required(),
});
// validacion de update
const updateProductsSchema = Joi.object({
  name: name, //si no es obligatorio no se pone el required
  price: price,
  image: image,
  description: description,
});
// validacion de get
const getProductsSchema = Joi.object({
  id: id.required(), //el required es para que sea obligatorio el id
});

// exportamos los esquemas
module.exports = {
  createProductsSchema,
  updateProductsSchema,
  getProductsSchema,
};
