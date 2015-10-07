var expect = require('chai').expect;
var basecamp = require('../src');

var api = basecamp.connectToApi('https://jellyvision5.basecamphq.com',{
    user: "drumney@jellyvision.com",
    password: ""
});

describe("todoListItems", function () {
    "use strict";
    this.timeout(10000);
    describe("#getItemsOnList", function() {
        it('should return all of the known todoLists in basecamp', function (done) {
            done();
        });
        it('should provide todoLists in a specific format', function (done) {
            done();
        });
    });
    describe.skip("#getItem", function(){});
    describe.skip("#completeItem", function(){});
    describe.skip("#uncompleteItem", function(){});
    describe.skip("#createItem", function(){});
    describe.skip("#updateItem", function(){});
    describe.skip("#deleteItem", function(){});

});
