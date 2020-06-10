const UrlController = require('../controller/UrlController');
let currentRoomName = '';
module.exports.socketIOCallback = async function(socket) {
    socket.on('join', (data) => joinRoomCallback(data, socket));
    socket.emit('first-login', {dataReturned: await UrlController.createShortenLink(getIPAddress())});
    socket.on('group chat', (data) => groupChatCallback(data, socket));
}

async function joinRoomCallback({shortenString}, socket) {
    currentRoomName = await UrlController.checkShortenLink(shortenString);
    socket.join(currentRoomName);
}

function groupChatCallback({message, nickname}, socket) {
    socket.broadcast.to(currentRoomName).emit('chat_response', {from: nickname || socket.id, message, dateTime: new Date()});
}

function getIPAddress() {
    let ipAddress = '::1';//- default for ipv6
    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) return;

            if (alias < 1)
            {
                ipAddress = iface.address;
            }
            ++alias;
        });
    });
    return ipAddress;
}