/**
 * Created by danrumney on 9/4/15.
 */

var _ = require('lodash');
var request = require('request');
var xmlConverter = require('./lib/xmlConverter');



module.exports = {
    getClient: function (serverUrl, options) {
        "use strict";
        options = _.defaults({headers: {"User-Agent": "Jellyvision Syncer"}}, options);


        var basicResponseHandler = function (error, message, body, cb) {
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
            todoLists: require("./lib/todoLists")(apiClient)
        };
    },
    connectToApi: function(serverUrl, options) {
        return this.getAPI(this.getClient(serverUrl, options));
    }
};
