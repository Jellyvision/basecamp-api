var expect = require('chai').expect;
var basecamp = require('../src');

var api = basecamp.connectToApi('https://jellyvision5.basecamphq.com',{
    user: "drumney@jellyvision.com",
    password: ""
});

describe("people", function () {
    "use strict";
    this.timeout(10000);
    describe("#getAll", function() {
        it('should return all of the known people in basecamp', function (done) {
            api.people.getAll(function(err, people) {
                if(err) {
                    console.error("[ERROR]: " + err);
                }
                expect(people).to.be.ok;
                expect(people).not.to.be.empty;

                done(err);
            });
        });
        it('should provide people in a specific format', function (done) {
            api.people.getAll(function(err, people) {
                expect(people).to.be.ok;

                var person = people[0];
                expect(person.id).to.exist;
                expect(person['company-id']).to.exist;
                expect(person['first-name']).to.exist;
                expect(person['last-name']).to.exist;
                expect(person['email-address']).to.exist;
                expect(person['email-address']).to.exist;

                done(err);
            });
        });
    });
    describe("#getPerson", function () {
        it('should return a single person when one is requested', function (done) {
            api.people.getPerson("10750604", function(err, person) {
                if(err) {
                    console.error("[ERROR]: " + err);
                }
                expect(person).to.be.ok;
                expect(person).not.to.be.empty;
                expect(person.id).to.equal(10750604);

                done(err);
            });
        });
        it('should return a an error when an invalid ID is passed', function (done) {
            api.people.getPerson("0", function(err, person) {

                expect(person).to.be.undefined;
                expect(err).to.be.ok;

                done();

            });
        });
    });
});
