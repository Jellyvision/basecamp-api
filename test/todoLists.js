var expect = require('chai').expect;
var basecamp = require('../src');

var api = basecamp.connect('https://jellyvision5.basecamphq.com',{
    user: "drumney@jellyvision.com",
    password: ""
});

describe("todoLists", function () {
    "use strict";
    this.timeout(10000);
    describe("#get", function() {
        it('should return all of the known todoLists in basecamp', function (done) {
            api.todoLists.get(function(err, todoLists) {
                expect(todoLists).to.be.ok;
                expect(todoLists).not.to.be.empty;

                done(err);
            });
        });
        it('should provide todoLists in a specific format', function (done) {
            api.todoLists.get(function(err, todoLists) {
                if(err) {
                    return done(err);
                }

                expect(todoLists).to.be.ok;

                var toDoList = todoLists[0];
                expect(toDoList).to.be.ok;
                expect(toDoList.id).to.exist;
                expect(toDoList.name).to.exist;
                expect(toDoList.completed).to.exist;
                expect(toDoList.complete).to.exist;

                done();
            });
        });
    });
});
