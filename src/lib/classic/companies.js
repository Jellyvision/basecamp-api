var _ = require('lodash');

module.exports = function (client) {
    "use strict";
    var companies = {
        client: client
    };

    companies.getAll = function(cb) {
        client.get("/companies.xml", function(err, data) {
            if(err) {
                cb(err);
            } else {
                cb(undefined,data.companies);
            }
        });
    };

    companies.getCompaniesForProject = function(projectId, cb) {
        if(_.isUndefined(cb) || _.isUndefined(projectId)) {
            throw new Error("getCompaniesForProject needs a project ID");
        } else {
            client.get("/projects/"+projectId+"/companies.xml", function(err, data) {
                if(err) {
                    cb(err);
                } else {
                    cb(undefined,data.companies);
                }
            });
        }
    };

    companies.getCompany = function(companyId, cb) {
        if(_.isUndefined(cb) || _.isUndefined(companyId)) {
            throw new Error("getCompany needs a company ID");
        } else {
            client.get("/companies/"+companyId+".xml", function(err, data) {
                if(err) {
                    cb(err);
                } else {
                    cb(undefined,data.company);
                }
            });
        }
    };


    return companies;
};
