const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let UrlSchema = new Schema({
    urlIP: {type: String}, //- why using ip?
    urlShortenName: {type: String}, //- 6 characters
    urlRoomName: {type: String} //- unique room name, should be 13 characters
})

// const UrlModel = mongoose.model('Url', UrlSchema);
// export default UrlModel;
module.exports.UrlModel = mongoose.model('Url', UrlSchema);
