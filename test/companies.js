var expect = require('chai').expect;
var basecamp = require('../src');

var api = basecamp.connectToApi('https://jellyvision5.basecamphq.com',{
    user: "drumney@jellyvision.com",
    password: ""
});

describe("companies", function () {
    "use strict";
    this.timeout(10000);
    describe("#getAll", function() {
        it('should return all of the known companies in basecamp', function (done) {
            api.companies.getAll(function(err, companies) {
                if(err) {
                    console.error("[ERROR]: " + err);
                    return done(err);
                }
                expect(companies).to.be.ok;
                expect(companies).not.to.be.empty;

                done();
            });
        });
        it('should provide companies in a specific format', function (done) {
            api.companies.getAll(function(err, companies) {
                if(err) {
                    console.error("[ERROR]: " + err);
                    return done(err);
                }
                expect(companies).to.be.ok;

                var company = companies[0];
                expect(company).to.have.property('id');
                expect(company).to.have.property('name');

                done();
            });
        });
    });
    describe("#getCompany", function () {
        it('should return a single company when one is requested', function (done) {
            api.companies.getCompany("3610688", function(err, company) {
                if(err) {
                    console.error("[ERROR]: " + err);
                    return done(err);
                }
                expect(company).to.be.ok;
                expect(company).not.to.be.empty;
                expect(company.id).to.equal(3610688);

                done(err);
            });
        });
        it('should return a an error when an invalid ID is passed', function (done) {
            api.companies.getCompany("0", function(err, company) {

                expect(company).to.be.undefined;
                expect(err).to.be.ok;

                done();

            });
        });
    });
    describe("#getCompaniesForProject", function () {
        it('should return companies associated with a project', function (done) {
            api.companies.getCompaniesForProject("11413507", function(err, companies) {
                if(err) {
                    console.error("[ERROR]: " + err);
                    return done(err);
                }
                expect(companies).to.be.ok;
                expect(companies).not.to.be.empty;
                expect(companies[0].id).to.equal(3381916);

                done(err);
            });
        });
        it('should return a an error when an invalid ID is passed', function (done) {
            api.companies.getCompaniesForProject("0", function(err, company) {

                expect(company).to.be.undefined;
                expect(err).to.be.ok;

                done();

            });
        });
    });

});
