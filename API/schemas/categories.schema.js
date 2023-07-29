const Joi = require('joi');

const id = Joi.string().min(1).max(3);
const name = Joi.string().min(5).max(30);
const description = Joi.string().max(255);

// validacion de create
const createCategoriesSchema = Joi.object({
  name: name.required(), //el required es para que sea obligatorio
  description: description.required(),
});
// validacion de update
const updateCategoriesSchema = Joi.object({
  name: name, //si no es obligatorio no se pone el required
  description: description,
});
// validacion de get
const getCategoriesSchema = Joi.object({
  id: id.required(), //el required es para que sea obligatorio el id
});

module.exports = {
  createCategoriesSchema,
  updateCategoriesSchema,
  getCategoriesSchema,
};
