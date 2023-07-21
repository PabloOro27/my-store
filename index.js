const express = require('express');
const app = express();
const port = 3000;

// ruta por defecto
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
})
// nueva ruta
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});
// ruta products
app.get('/products', (req, res) => {
  //genera un json con los productos de la base de datos
  res.json({
    name: 'Producto 1',
    price: 1000
  });
});
// ruta categorias
app.get('/categories', (req, res) => {
  res.json({
    name: 'Categoria 1',
    description: 'Esta es la categoria 1'
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
