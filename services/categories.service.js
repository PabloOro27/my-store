// dentro de los servicios se definen las funciones que se van a utilizar en las rutas
const { faker } = require('@faker-js/faker');

// clase para el servicio de categorias
class CategorieService{
  // necesitamos un constructor para pasarle el modelo de la base de datos
  constructor(){
    this.categories = []; // inicializamos el array de productos
    this.generate(); // llamamos al metodo generate
  }

  // metodo para obtener todos los productos
  generate(){
    const limit = 10; // limite de productos
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: (i + 1).toString(),
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      });
    }
  }

  // crear
  create(name, description){
    const newCategory = {
      id: (this.categories.length + 1).toString(),
      name,
      description,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  // buscar general
  find(){
    return this.categories;
  }
  // buscar solo uno
  findOne(id){
    // buscamos la categoria con el id
    return this.categories.find(item => item.id === id);
  }
  // actualizar
  update(id, changes){
    // buscamos la categoria con el id
    const index = this.categories.findIndex(item => item.id === id);
    // actualizamos la categoria
    this.categories[index] = {
      ...this.categories[index],
      ...changes,
    };
    return this.categories[index];

  }
  // eliminar
  delete(id){
    // buscamos la categoria con el id
    const index = this.categories.findIndex(item => item.id === id);
    // eliminamos la categoria
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategorieService;
