'use strict'
const mongoose = require('mongoose');
//- rethinkdb area
// var r = require('rethinkdb');
// var promise = r.connect({db: 'stably'});

module.exports.connect = async function()
{
    let connectionString = 'mongodb://transybao:transybao93@ds161780.mlab.com:61780/stably';
    let options = {
        useNewUrlParser: true,
        autoIndex: true,
        autoReconnect: true
    }
    mongoose.set('useCreateIndex', true);
    //- connect to database
    mongoose.connect(connectionString, options);
    
    //- error catch event
    mongoose.connection.on('connected', () => {
        console.info('Database connected');
    });
    mongoose.connection.on('error', () => {
        console.info('Database error !!!');
    });
    mongoose.connection.on('disconnected', () => {
        console.info('Database disconnected...');
    });
}

//- rethinkdb connection
// module.exports.rethinkDBConnection = function() {
//     var connection = null;
    
//     r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
//         if (err) throw err;
//         r.dbList()
//         .contains('stably')
//         .do(databaseExists =>
//             r.branch(databaseExists, { dbs_created: 0 }, r.dbCreate('stably'))
//         )
//         .run(conn);

//         r.db('stably').table("url").insert({
//             "uIP": "12345",
//             bao: 1236,
//             "title": "Lorem ipsum3333",
//             "class": "Dolor sit amet 2222"
//         }).run(conn)
//         connection = conn;
//     });
// }

// function rethinkDBCallback(result) {
//     console.log('result...', result);
// }