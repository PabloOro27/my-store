const express = require('express'); // importa express
const router = express.Router(); // crea una instancia de express

// users con query params --------------------------
router.get('/', (req, res) => {
  const {limit, offset} = req.query; // destructuring de los query params que llegan en la url (localhost:3000/users?limit=10&offset=0)
  if(limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay usuarios');
  }
});

module.exports = router; // exportamos el router
