var io = require('socket.io-client');

describe('Suite of unit tests', function() {

    // var socket;

    var server,
        options ={
            transports: ['websocket'],
            'force new connection': true
        };

    beforeEach(function(done) {
        // Setup
        socket = io.connect('http://localhost:3000', {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        });
        socket.on('connect', function() {
            console.log('worked...');
            done();
        });
        socket.on('disconnect', function() {
            console.log('disconnected...');
        });
        done();
    });

    afterEach(function(done) {
        // Cleanup
        if(socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

    describe('basic socket.io example', () => {
        it('should communicate', (done) => {
            // once connected, emit Hello World
            socket.emit('echo', 'Hello World');
            socket.on('echo', (message) => {
                // Check that the message matches
                expect(message).toBe('Hello World');
                done();
            });
            socket.on('connection', (mySocket) => {
                expect(mySocket).toBeDefined();
            });
            done();
        });
        it('should communicate with waiting for socket.io handshakes', (done) => {
            // Emit sth from Client do Server
            socket.emit('examlpe', 'some messages');
            // Use timeout to wait for socket.io server handshakes
            setTimeout(() => {
                // Put your server side expect() here
                done();
            }, 50);
        });
    });

});