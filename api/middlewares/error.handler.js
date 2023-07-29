// los middlewares se ejecutan en el orden en el que se declaran

// errore de logeo
function logErrors(err, req, res, next){
  console.error(err);
  next(err);
}

// envia un json con el error
function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

// funciones para manejar errores con boom
function boomErrorHandler(err, req, res, next){
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
