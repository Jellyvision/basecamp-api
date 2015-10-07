var expect = require('chai').expect;
var basecamp = require('../src');
var _ = require('lodash');

var api = basecamp.connect('https://jellyvision5.basecamphq.com',{
    user: "drumney@jellyvision.com",
    password: ""
});

describe("people", function () {
    "use strict";
    this.timeout(10000);
    describe("#get", function() {
        it('should return all of the known people in basecamp', function (done) {
            api.people.get(function(err, people) {
                if(err) {
                    console.error("[ERROR]: " + err);
                }
                expect(people).to.be.ok;
                expect(people).not.to.be.empty;

                done(err);
            });
        });
        it('should provide people in a specific format', function (done) {
            api.people.get(function(err, people) {
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
});
