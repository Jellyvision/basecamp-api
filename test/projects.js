var expect = require('chai').expect;
var basecamp = require('../src');

var APIClient = require('./TestAPIClient/index');
var api = basecamp.getAPI(APIClient);

describe("projects", function () {
    "use strict";
    this.timeout(10000);
    describe("#get", function() {
        it('should return all of the known projects in basecamp', function (done) {
            api.projects.get(function(err, projects) {
                if(err) {
                    console.error("[ERROR]: " + err);
                }
                expect(projects).to.be.ok;
                expect(projects).not.to.be.empty;

                done(err);
            });
        });
        it('should provide projects in a specific format', function (done) {
            api.projects.get(function(err, projects) {
                expect(projects).to.be.ok;

                var project = projects[0];
                expect(project).to.have.property('created-on');
                expect(project).to.have.property('id');
                expect(project).to.have.property('last-changed-on');
                expect(project).to.have.property('name');
                expect(project).to.have.property('status');
                expect(project).to.have.property('company');
                expect(project.company.name).to.deep.equal('Test Company');

                done(err);
            });
        });
    });
});
