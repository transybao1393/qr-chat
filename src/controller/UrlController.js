const UrlModel = require('../model/UrlModel');
const Str = require('@supercharge/strings');
const {
    size,
    map
} = require("lodash");

module.exports.createShortenLink = async function(currentIP) { 
    console.log('current ip on model', currentIP)
    try {
        let urlModel = await UrlModel.UrlModel.find({
            urlIP: currentIP
        }).select('urlShortenName urlRoomName'); 
        if(size(urlModel) > 0) {
            return {
                urlShortenName: map(urlModel, 'urlShortenName')[0],
                urlRoomName: map(urlModel, 'urlRoomName')[0],
                currentIP
            };
        } else {
            const roomName = Str.random(13);
            const urlShortenName = Str.random(6);
            await UrlModel.UrlModel.create({
                urlIP: currentIP,
                urlShortenName: urlShortenName,
                urlRoomName: roomName,
            });
            return {
                urlShortenName,
                urlRoomName: roomName,
                currentIP
            };
        }
    } catch (error) {
        console.error(error);
    }
    return {};
}

module.exports.checkShortenLink = async function(shortenName) { 
    try {
        let urlModel = await UrlModel.UrlModel.find({
            urlShortenName: shortenName
        }).select('urlRoomName'); 
        return map(urlModel, 'urlRoomName')[0];
    } catch (error) {
        console.error(error);
    }
    return {};
}
