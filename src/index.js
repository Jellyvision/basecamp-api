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




        return {
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
        return {
            companies: require("./lib/companies")(apiClient),
            people: require("./lib/people")(apiClient),
            projects: require("./lib/projects")(apiClient),
            todoLists: require("./lib/todoLists")(apiClient),
            todoListItems: require("./lib/todoLists")(apiClient)
        };
    },
    connectToApi: function(serverUrl, options) {
        return this.getAPI(this.getClient(serverUrl, options));
    }
};
