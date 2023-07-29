const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom'); // importamos boom para los errores

// clase maestra para el servicio de productos
class ProductService {
  constructor() {
    this.products = []; // inicializamos el array de productos
    this.generate(); // llamamos al metodo generate
  }

  // metodo para generar los productos
  generate() {
    const limit = 100; // limite de productos
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: (i + 1).toString(),
        name: faker.commerce.productName(),
        price: faker.commerce.price({
          min: 100,
          max: 5000,
          dec: 2,
          symbol: 'Q',
        }),
        image: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
      });
    }
  }

  // CRUD'S create read update delete
  // crear-------------------------------------------
  async create(name, price, image, description) {
    const newProduct = {
      id: (this.products.length + 1).toString(),
      name,
      price,
      image,
      description,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  // buscar general----------------------------------
  async find() {
    // simulamos una peticion a una base de datos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }
  // buscar solo uno---------------------------------
  async findOne(id) {
    const index = this.products.findIndex((item) => item.id === id);
    // buscamos el producto con el id
    if (index === -1) {
      // throw new Error('id no found');
      throw boom.notFound('id not found');
    }
    // buscamos el producto con el id
    return this.products.find((item) => item.id === id);
  }
  // actualizar--------------------------------------
  update(id, changes) {
    // buscamos el producto con el id
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('id no found');
    }
    // actualizamos el producto
    this.products[index] = {
      ...this.products[index],
      ...changes,
    };
    return this.products[index];
  }
  // eliminar----------------------------------------
  async delete(id) {
    // buscamos el producto con el id
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('id no found');
    }
    // eliminamos el producto
    this.products.splice(index, 1);
    return { id };
  }
}

// exportamos la clase
module.exports = ProductService;
