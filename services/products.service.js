const {faker} = require('@faker-js/faker');

// clase maestra para el servicio de productos
class ProductService {
  constructor(){
    this.products = []; // inicializamos el array de productos
    this.generate(); // llamamos al metodo generate
  }

  // metodo para generar los productos
  generate(){
    const limit = 100; // limite de productos
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: (i + 1).toString(),
        name: faker.commerce.productName(),
        price: faker.commerce.price({min: 100, max: 5000, dec: 2, symbol: 'Q'}),
        image: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
      });
    }
  }

  // CRUD'S create read update delete
  // crear
  create(name, price, image, description){
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
  // buscar general
  find(){
    return this.products;
  }
  // buscar solo uno
  findOne(id){
    // buscamos el producto con el id
    return this.products.find(item => item.id === id);
  }
  // actualizar
  update(id, changes){
    // buscamos el producto con el id
    const index = this.products.findIndex(item => item.id === id);
    // actualizamos el producto
    this.products[index] = {
      ...this.products[index],
      ...changes,
    };
    return this.products[index];
  }
  // eliminar
  delete(id){
    // buscamos el producto con el id
    const index = this.products.findIndex(item => item.id === id);
    // eliminamos el producto
    this.products.splice(index, 1);
    return { id };
  }
}

// exportamos la clase
module.exports = ProductService;
