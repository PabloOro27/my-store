// dentro de los servicios se definen las funciones que se van a utilizar en las rutas
const { faker } = require('@faker-js/faker');
const { ne } = require('faker/lib/locales');

// clase para el servicio de categorias
class CategorieService {
  // necesitamos un constructor para pasarle el modelo de la base de datos
  constructor() {
    this.categories = []; // inicializamos el array de productos
    this.generate(); // llamamos al metodo generate
  }

  // metodo para obtener todos los productos
  generate() {
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
  async create(name, description) {
    const newCategory = {
      id: (this.categories.length + 1).toString(),
      name,
      description,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  // buscar general
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 5000);
    });
  }
  // buscar solo uno
  async findOne(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    // buscamos la categoria con el id
    if(index === -1 ) {
      throw new Error('id not found');
    }
    // retornamos la categoria
    return this.categories.find((item) => item.id === id);
  }
  // actualizar
  async update(id, changes) {
    // buscamos la categoria con el id
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    // actualizamos la categoria
    this.categories[index] = {
      ...this.categories[index],
      ...changes,
    };
    return this.categories[index];
  }
  // eliminar
  async delete(id) {
    // buscamos la categoria con el id
    const index = this.categories.findIndex((item) => item.id === id);
    // eliminamos la categoria
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategorieService;
