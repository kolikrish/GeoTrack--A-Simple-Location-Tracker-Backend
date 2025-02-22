const express = require('express');
const app = express();
const http = require('http');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

io.on('connection', function (socket) {
    socket.on('send-location',(data) => {
        io.emit('receive-location',{id: socket.id, ...data});
    })

    socket.on('disconnect',() => {
        io.emit('user-disconnected',socket.id);
    });
    console.log('Disconnected');
});

app.get('/', function (req, res) {
  res.render('index');
})

server.listen(3000)

