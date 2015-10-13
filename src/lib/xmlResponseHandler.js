var xmlConverter = require('./xmlConverter');
var winston = require('winston');

module.exports = function (error, message, body, cb) {
    "use strict";
    if (error) {
        winston.error("[Error]: " + error);
        return cb(error);
    }
    if(message.statusCode !== 200) {
        winston.warn("We got a " + message.statusCode + " response!");
        return cb(new Error("HTTP Status: "+message.statusCode));
    }

    xmlConverter.convertXML(body, function (err, result) {
        if (err) {
            winston.error(body);
            winston.error("[Error]: " + err);
            cb(err);
        } else {
            cb(null, result);
        }
    });
};
