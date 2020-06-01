var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const redis = require('socket.io-redis');
const {connect} = require('./connection');
connect();
const UrlController = require('./controller/UrlController');
// io.adapter(redis({ host: 'localhost', port: 6379 }));

io.on('connection', async (socket) => {
    let currentRoomName = '';
    var address = getIPAddress();
    socket.on('chat', (msg) => {
        console.log('received message', msg);
    });

    socket.on('join', async (data) => {
        currentRoomName = await UrlController.checkShortenLink(data.shortenString);
        socket.join(currentRoomName);
        io.in(currentRoomName).clients((err,clis) => {
            console.log(clis);
        });
    });

    let obj = await UrlController.createShortenLink(address);
    obj.currentIP = address;

    socket.emit('first-login', {dataReturned: obj});

    socket.on('group chat', ({message, nickname}) => {
        socket.broadcast.to(currentRoomName).emit('chat_response', {from: nickname || socket.id, message, dateTime: new Date()});
    });
});

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

function getIPAddress() {
    let ipAddress = '::1';//- default for ipv6
    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                // console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                // console.log(ifname, iface.address);
                ipAddress = iface.address;
            }
            ++alias;
        });
    });
    return ipAddress;
}