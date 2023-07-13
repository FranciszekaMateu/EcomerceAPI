const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Acceso denegado.' });
      }
      next();
    };
  };
  const adminMiddleware = (req, res, next) => {
    if (req.cookies.userData && req.cookies.userData.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado. Requiere permisos de administrador' });
    }
  };
  
  module.exports = {
    adminMiddleware,
    authorizeRole,
  };
  
  