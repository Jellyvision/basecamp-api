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

                expect(todoLists).to.be.ok;
                expect(todoLists).not.to.be.empty;

                done(err);
            });
        });
    });
    describe("#getListsForProject", function () {
        it("returns all lists associated with a project" , function (done) {
            api.todoLists.getListsForProject(99999999, function (err, todoLists) {
                if (err) {
                    return done(err);
                }

                expect(todoLists).to.be.ok;
                expect(todoLists).not.to.be.empty;
                expect(todoLists).to.have.length(2);
                done();
            });
        });
        it("supports filter values: 'finished'" , function (done) {
            api.todoLists.getListsForProject(99999999, 'finished', function (err, todoLists) {
                if (err) {
                    return done(err);
                }

                expect(todoLists).to.be.ok;
                expect(todoLists).to.be.empty;
                expect(todoLists).to.have.length(0);
                done();
            });
        });
        it("supports filter value: 'all'" , function (done) {
            api.todoLists.getListsForProject(99999999, 'all', function (err, todoLists) {
                if (err) {
                    return done(err);
                }

                expect(todoLists).to.be.ok;
                expect(todoLists).not.to.be.empty;
                expect(todoLists).to.have.length(2);
                done();
            });
        });
        it("supports filter values: 'pending'" , function (done) {
            api.todoLists.getListsForProject(99999999, 'pending', function (err, todoLists) {
                if (err) {
                    return done(err);
                }

                expect(todoLists).to.be.ok;
                expect(todoLists).not.to.be.empty;
                expect(todoLists).to.have.length(2);
                done();
            });
        });
        it("throws an error on unknown filter values" , function (done) {
            api.todoLists.getListsForProject(99999999, 'broken', function (err) {
                expect(err).to.be.ok;
                done();
            });
        });

    });
    describe("#getList", function () {
        it('returns a todo list when passed an ID', function (done) {
            api.todoLists.getList(1, function (err, list) {
                if(err) {
                    return done(err);
                }

                expect(list).to.be.ok;
                expect(list).to.have.property("description");
                expect(list).to.have.property("id");
                expect(list).to.have.property("milestone-id");
                expect(list).to.have.property("name");
                expect(list).to.have.property("position");
                expect(list).to.have.property("private");
                expect(list).to.have.property("project-id");
                expect(list).to.have.property("tracked");
                done();
            });
        });
        it('returns an error when passed an unkown ID', function (done) {
            api.todoLists.getList("99", function(err, list) {

                expect(list).to.be.undefined;
                expect(err).to.be.ok;

                done();

            });
        });

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
