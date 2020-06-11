var io = require('socket.io-client');

describe('SocketIO Unit Test', function() {

    var socket;
    var options = {
        'reconnection delay' : 0,
        'reopen delay' : 0,
        'force new connection' : true
    };
    var socketURL = 'http://localhost:3000';

    beforeEach(function(done) {
        // Setup
        socket = io.connect(socketURL, options);
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

    describe('when IP address detected and returned', () => {
        it('Should return object data', (done) => {
            var initData = {
                urlShortenName: '6Yhn0p', //- random 6 digit string
                currentIP: '0.0.0.0'
            };
            socket.emit('first-login', initData);
            setTimeout(async () => {
                await socket.on('first-login', (data) => {
                    expect(typeof data).toBe('object');
                    expect(typeof data).not.toBe('function');
                    expect(data.urlShortenName).toEqual(initData.urlShortenName);
                    expect(data.currentIP).toEqual(initData.currentIP);
                });
                done();
            }, 500);
        });

        it('Should send message on group chat', (done) => {
            var initData = {
                message: 'hello',
                nickname: 'transybao'
            };
            socket.emit('group chat', initData);
            setTimeout(async () => {
                await socket.on('group chat', (data) => {
                    expect(typeof data).toBe('object');
                    expect(typeof data).not.toBe('function');
                    expect(data.message).toEqual('hello');
                });
                done();
            }, 500);
        });

        it('Should catch the message from client', (done) => {
            var initData = {
                message: 'hello',
                nickname: 'transybao'
            };
            socket.emit('group chat', initData);
            setTimeout(async () => {
                await socket.on('group chat', (data) => {
                    expect(typeof data).toBe('object');
                    expect(typeof data).not.toBe('function');
                    expect(data.message).toEqual('hello');
                });
                done();
            }, 500);
        });

        it('Should response message with intended data object', (done) => {
            var initData = {
                message: 'hello',
                nickname: 'transybao'
            };
            socket.emit('group chat', initData);

            setTimeout(() => {
                var groupChatPromise = new Promise((resolve, reject) => {
                    resolve('resolve catch group chat data from client...');
                });
    
                var chatResponsePromise = new Promise((resolve, reject) => {
                    resolve(socket.on('chat_response', chatReponseCallback));
                });
    
                var chatReponseCallback = (data) => {
                    return data;
                };
    
                Promise.all([groupChatPromise, chatResponsePromise])
                .then((results) => {
                    var chatResponseData = results[1];
                    expect(typeof chatResponseData).toBe('object');
                    expect(typeof chatResponseData).not.toBe('function');
                    expect(chatResponseData.from).toEqual(initData.nickname);
                    expect(chatResponseData.message).toEqual(initData.message);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            }, 500);
            
        });

    });

});