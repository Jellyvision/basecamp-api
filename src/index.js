/**
 * Created by danrumney on 9/4/15.
 */

var _ = require('lodash');
var request = require('request');
var parseString = require('xml2js').parseString;
var xmlConverter = require('./lib/xmlConverter');



module.exports = {
    connect: function (serverUrl, options) {
        "use strict";
        var client;
        options = _.defaults({headers: {"User-Agent": "Jellyvision Syncer"}}, options);


        var apiClient = {
            get: function (endPoint, cb) {
                var requestOptions = _.defaults({}, options, {
                    url: serverUrl + endPoint,
                    auth: {
                        username: "drumney@jellyvision.com",
                        password: ""
                    }});

                request.get(requestOptions, function(error, response, body) {
                    if(error) {
                        console.error("[Error]: " + error);
                        return cb(error.request.options);
                    }


                    xmlConverter.convertXML(body, function (err, result) {
                        if(err) {
                            console.error("[Error]: " + err);
                            cb(err);
                        } else {
                            cb(null,result);
                        }
                    });


                });
            }
        };

        var api = {
            people: require("./lib/people")(apiClient),
            projects: require("./lib/projects")(apiClient),
            todoLists: require("./lib/todoLists")(apiClient)
        };


        return api;


    }
};
