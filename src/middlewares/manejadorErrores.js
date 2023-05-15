
class AppError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }
  
  const errorDictionary = {
    PRODUCT_NOT_FOUND: new AppError(404, 'Producto no encontrado'),
    CART_NOT_FOUND: new AppError(404, 'Carrito no encontrado'),
    USER_NOT_FOUND: new AppError(404, 'Usuario no encontrado'),
    INVALID_INPUT: new AppError(400, 'Datos de entrada inválidos'),
  };
  
  function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  module.exports = {
    errorHandler,
    errorDictionary,
    AppError,
  };