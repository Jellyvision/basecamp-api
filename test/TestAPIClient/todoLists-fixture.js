var _ = require('lodash');
var FixtureBuilder = require('./FixtureBuilder');

var xmlify = require('./xmlify');
var todoLists = require('./fixtures/todoLists.json');

var data = {};
_.forEach(todoLists, function ( todoList, id ) {
    "use strict";
    data[id] = xmlify('company',todoList);
});

var fixtureBuilder = new FixtureBuilder("todo-lists");

module.exports = fixtureBuilder
    .setData({})
    .addBaseEndpoints()
    .build();
