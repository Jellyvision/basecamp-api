/**
 * Created by danrumney on 9/4/15.
 */

module.exports = function (client) {

    var projects = {
        client: client
    };

    projects.get = function(cb) {
        client.get("/projects.xml", function(err, data) {
            if(err) {
                cb(err);
            } else {
                cb(undefined,data['projects']);
            }
        });
    };

    return projects;
};
