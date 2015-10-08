/**
 * Created by danrumney on 9/4/15.
 */

var _ = require('lodash');
var request = require('request');
var basicResponseHandler = require('./lib/xmlResponseHandler');



module.exports = {
    getClient: function (serverUrl, options) {
        "use strict";
        options = _.defaults({headers: {"User-Agent": "Jellyvision Syncer"}}, options);

        if(_.isUndefined(options.version)) {
            options.version = "classic";
        }
        if(options.version !== "classic") {
            throw new Error("Unsupported basecamp version selected: " + options.version);
        }


        return {
            version: options.version,
            get: function (endPoint, cb) {
                var requestOptions = _.defaults({}, options, {
                    url: serverUrl + endPoint,
                    auth: {
                        username: "drumney@jellyvision.com",
                        password: ""
                    }
                });


                request.get(requestOptions, _.partialRight(basicResponseHandler, cb));
            }
        };

    },
    getAPI: function(apiClient) {
        "use strict";
        return {
            companies: require("./lib/"+apiClient.version+"/companies")(apiClient),
            people: require("./lib/"+apiClient.version+"/people")(apiClient),
            projects: require("./lib/"+apiClient.version+"/projects")(apiClient),
            todoLists: require("./lib/"+apiClient.version+"/todoLists")(apiClient),
            todoListItems: require("./lib/"+apiClient.version+"/todoLists")(apiClient)
        };
    },
    connectToApi: function(serverUrl, options) {
        "use strict";
        return this.getAPI(this.getClient(serverUrl, options));
    }
};
