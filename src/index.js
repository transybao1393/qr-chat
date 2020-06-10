var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const {connect} = require('./connection');
connect();

const socketService = require('./services/socketSerivce');
io.on('connection', (socket) => socketService.socketIOCallback(socket));

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/:shortenName', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

http.listen(3000, () => {
  console.log('Server is started and listening on port 3000');
});