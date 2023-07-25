const express = require('express'); // importa express
const app = express(); // crea una instancia de express
const port = 3000; // puerto por defecto
const routerApi = require('./routes'); // importamos el router de la api
// middleware para parsear el body
app.use(express.json());

// ruta por defecto--------------------------------
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
})
// nueva ruta--------------------------------------
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});
// -----------------------------------------------
// llamada de los routers
routerApi(app); // le decimos a express que use el router de la api

// -----------------------------------------------
// escucha el puerto ymanda un mensaje por consola
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
