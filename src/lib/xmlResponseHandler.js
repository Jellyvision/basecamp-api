var xmlConverter = require('./xmlConverter');

module.exports = function (error, message, body, cb) {
    "use strict";
    if (error) {
        console.error("[Error]: " + error);
        return cb(error);
    }
    if(message.statusCode !== 200) {
        console.warn("We got a " + message.statusCode + " response!");
        return cb(new Error("HTTP Status: "+message.statusCode));
    }

    xmlConverter.convertXML(body, function (err, result) {
        if (err) {
            console.log(body);
            console.error("[Error]: " + err);
            cb(err);
        } else {
            cb(null, result);
        }
    });
};
