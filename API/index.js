const express = require('express'); // importa express
const app = express(); // crea una instancia de express
const port = process.env.PORT || 3000; // puerto por defecto
const routerApi = require('./routes'); // importamos el router de la api
const cors = require('cors'); // importamos cors
// traemos el middleware de errores---------------------------
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
// middleware para parsear el body--------------------------------
app.use(express.json());
// usamos cors para que se pueda conectar a cualquier origen
const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido, no esta autorizado'));
    }
  },
};
app.use(cors(options));

// ruta por defecto--------------------------------
app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
})
// nueva ruta--------------------------------------
app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});
// -----------------------------------------------
// llamada de los routers
routerApi(app); // le decimos a express que use el router de la api
// ------------------------------------------------------------------------------------------------
// llamado de middlewares de errores, siempre se hacen despues del routeing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
// -----------------------------------------------
// escucha el puerto ymanda un mensaje por consola
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
