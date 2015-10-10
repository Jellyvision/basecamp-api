var fixtures =  [
    require('./companies-fixture'),
    require('./people-fixture'),
    require('./projects-fixture'),
    require('./todoLists-fixture')
    ];
var _ = require('lodash');
var xmlResponseHandler = require('../../src/lib/xmlResponseHandler');

var endpoints = _.reduce(fixtures, function(endpoints, fixture) {
    "use strict";
    return _(endpoints).concat( fixture.getEndpoints()).value();
}, []);

module.exports = {
    version: "classic",
    get: function (url, cb) {
        "use strict";
        var response;
        console.log("GET: " + url);
        var requestedEndpoint = _.find(endpoints, function(endpoint) {
            return endpoint.matcher(url);
        });
        if(requestedEndpoint) {
            response = requestedEndpoint.handler.call(requestedEndpoint, url);
        }
        xmlResponseHandler(null, { statusCode: response ? 200:404 }, response || "<error></error>", cb);

    },
    post: function (endpoint, cb) {
        "use strict";
        cb(new Error("Not yet implemented"));
    },
    put: function (endpoint, cb) {
        "use strict";
        cb(new Error("Not yet implemented"));
    },
    delete: function (endpoint, cb) {
        "use strict";
        cb(new Error("Not yet implemented"));
    }
};
