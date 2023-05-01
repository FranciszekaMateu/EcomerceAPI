const app = require('./app');
const router = require('./routes/index');
const { Server } = require('socket.io');
const PORT = 8080;

app.use('/', router);

const httpServer = app.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`Escuchando en el puerto ${httpServer.address().port}`);
});

const io = new Server(httpServer);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on("login", (email) => {
        app.set("auth", true);
        app.set("user", email);
    });

    socket.on('mensaje', data => {
        io.emit("recibido");
    });

    socket.on('disconnect', () => {
        console.log('Disconnect');
    });
});
s