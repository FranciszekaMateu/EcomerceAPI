const app = require('./app');
const { Server } = require('socket.io');
const PORT = 8080;
const httpServer = app.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`Escuchando en el puerto ${httpServer.address().port}`);
});


