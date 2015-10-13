var expect = require('chai').expect;
var basecamp = require('../src');

var APIClient = require('./TestAPIClient/index');
var api = basecamp.getAPI(APIClient);

describe("todoLists", function () {
    "use strict";
    this.timeout(10000);
    describe("#getToDoListsForUser", function () {
        it('should return all of the known todoLists for which a user is responsible', function (done) {
            api.todoLists.getToDoListsForUser(2, function (err, todoLists) {
                if (err) {
                    return done(err);
                }
                console.log(todoLists);
                expect(todoLists).to.be.ok;
                expect(todoLists).not.to.be.empty;

                done(err);
            });
        });
        it('should provide todoLists in a specific format', function (done) {
            api.todoLists.getToDoListsForUser(2, function (err, todoLists) {
                if (err) {
                    return done(err);
                }

                expect(todoLists).to.be.ok;

                var toDoList = todoLists[0];
                expect(toDoList).to.be.ok;
                expect(toDoList).to.have.property('id');
                expect(toDoList).to.have.property('name');

                done();
            });
        });
    });

    describe("#getToDoListsThatAreNotAssigned", function () {

        it("returns all of the todo items that are not assigned to anyone", function (done) {
            api.todoLists.getToDoListsThatAreNotAssigned(function (err, todoLists) {
                if (err) {
                    return done(err);
                }
                console.log(todoLists);

                expect(todoLists).to.be.ok;
                expect(todoLists).not.to.be.empty;

                done(err);
            });
        });
    });
    describe("#getListsForProject", function () {
        it("returns all lists associated with a project" , function (done) {
            api.todoLists.getListsForProject()

        });

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
