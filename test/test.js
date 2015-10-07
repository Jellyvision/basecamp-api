var expect = require('chai').expect;
var basecamp = require('../src');
describe("API connection", function () {
    "use strict";
    describe("#getClient", function() {
        it('should provide a number of functions when connected', function () {
            var apiClient = basecamp.getClient('https://jellyvision5.basecamphq.com',{
                user: "drumney@jellyvision.com",
                password: ""
            });
            var api = basecamp.getAPI(apiClient);
            expect(api.projects).to.be.ok;
            expect(api.todoLists).to.be.ok;
        });
    });
});
