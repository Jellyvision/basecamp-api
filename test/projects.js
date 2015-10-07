var expect = require('chai').expect;
var basecamp = require('../src');

var api = basecamp.connectToApi('https://jellyvision5.basecamphq.com',{
    user: "drumney@jellyvision.com",
    password: ""
});

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
                expect(project['created-on']).to.exist;
                expect(project.id).to.exist;
                expect(project['last-changed-on']).to.exist;
                expect(project.name).to.exist;
                expect(project.status).to.exist;
                expect(project.company).to.exist;
                expect(project.company.name).to.deep.equal('Jellyvision');

                done(err);
            });
        });
    });
});
