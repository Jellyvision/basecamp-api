
module.exports = function (client) {
    "use strict";
    var projects = {
        client: client
    };

    projects.getAll = function(cb) {
        client.get("/people.xml", function(err, data) {
            if(err) {
                cb(err);
            } else {
                cb(undefined,data.people);
            }
        });
    };

    projects.getPerson = function(personId, cb) {
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

    return projects;
};
