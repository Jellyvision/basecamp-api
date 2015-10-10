var expect = require('chai').expect;
var basecamp = require('../src');

var APIClient = require('./TestAPIClient/index');
var api = basecamp.getAPI(APIClient);

describe("todoLists", function () {
    "use strict";
    this.timeout(10000);
    describe("#getToDoListsForUser", function() {
        it.skip('should return all of the known todoLists for which a user is responsible', function (done) {
            api.todoLists.getToDoListsForUser(33,function(err, todoLists) {
                if(err) {
                    return done(err);
                }
                expect(todoLists).to.be.ok;
                expect(todoLists).not.to.be.empty;

                done(err);
            });
        });
        it.skip('should provide todoLists in a specific format', function (done) {
            api.todoLists.getToDoListsForUser(function(err, todoLists) {
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

    describe("#getToDoListsThatAreNotAssigned", function () {

    });
    describe("#searchForList", function () {

    });
    describe("#getList", function () {

    });
    describe("#updateList", function () {

    });
    describe("#createList", function () {

    });
    describe("#destroyList", function () {

    });
    describe("#reorderList", function () {

    });
});
