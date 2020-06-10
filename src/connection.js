'use strict'
const mongoose = require('mongoose');

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