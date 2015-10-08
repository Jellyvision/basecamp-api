var _ = require('lodash');

module.exports = function (client) {
    "use strict";
    var people = {
        client: client
    };

    people.getAll = function(cb) {
        client.get("/people.xml", function(err, data) {
            if(err) {
                cb(err);
            } else {
                cb(undefined,data.people);
            }
        });
    };

    people.getPerson = function(personId, cb) {
        if(_.isUndefined(cb) || _.isUndefined(personId)) {
            throw new Error("getPerson needs a person ID");
        } else {
            client.get("/people/"+personId+".xml", function(err, data) {
                if(err) {
                    cb(err);
                } else {
                    cb(undefined,data.person);
                }
            });
        }
    };

    return people;
};
