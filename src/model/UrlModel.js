const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let UrlSchema = new Schema({
    urlIP: {type: String},
    urlShortenName: {type: String},
    urlRoomName: {type: String}
})
module.exports.UrlModel = mongoose.model('Url', UrlSchema);
