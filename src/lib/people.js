
module.exports = function (client) {
    "use strict";
    var projects = {
        client: client
    };

    projects.get = function(cb) {
        client.get("/people.xml", function(err, data) {
            if(err) {
                cb(err);
            } else {
                cb(undefined,data.people);
            }
        });
    };

    return projects;
};
