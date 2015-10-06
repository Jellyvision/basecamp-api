var expect = require('chai').expect;
var basecamp = require('../src');
describe("API connection", function () {
    "use strict";
    describe("#connect", function() {
        it('should provide a number of functions when connected', function () {
            var api = basecamp.connect('https://jellyvision5.basecamphq.com',{
                user: "drumney@jellyvision.com",
                password: ""
            });
            expect(api.projects).to.be.ok;
            expect(api.todoLists).to.be.ok;
        });
    });
});
