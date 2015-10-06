var chai = require('chai');
chai.use(require('chai-datetime'));
var expect = require('chai').expect;
var converter = require('../src/lib/xmlConverter');
describe("XML Converter", function () {
    "use strict";
    describe("#process", function () {
        it("recognizes integers", function() {
            expect(converter.process({
                "_": "3381916",
                "$": {
                    "type": "integer"
                }
            })).to.equal(3381916);
            expect(converter.process({
                "_": "-3",
                "$": {
                    "type": "integer"
                }
            })).to.equal(-3);
        });
        it("recognizes dates", function () {
            expect(converter.process({
                "_": "2015-10-30",
                "$": {
                    "type": "date"
                }
            })).to.equalDate(new Date("2015-10-30 00:00:00"));
            expect(converter.process({
                "_": "2014-01-03 05:16:00",
                "$": {
                    "type": "datetime"
                }
            })).to.equalDate(new Date("2014-01-03 05:16:00"));
        });
        it("recognizes strings", function() {
            expect(converter.process({
                "_": "Hello World",
                "$": {
                    "type": "string"
                }
            })).to.equal("Hello World");
            expect(converter.process({
                "_": "Hello World"
            })).to.equal("Hello World");
        });
        it("treats single item lists as a single item", function () {
            expect(converter.process([{
                "_": "Hello World",
                "$": {
                    "type": "string"
                }
            }])).to.equal("Hello World");
        });

        var xmlObject = {
            "created-on": [
                {
                    "_": "2015-09-14",
                    "$": {
                        "type": "date"
                    }
                }
            ],
            "id": [
                {
                    "_": "13061146",
                    "$": {
                        "type": "integer"
                    }
                }
            ],
            "last-changed-on": [
                {
                    "_": "2015-09-30T15:15:49Z",
                    "$": {
                        "type": "datetime"
                    }
                }
            ],
            "name": [
                "RBC Deferred Comp Jellyroll (SOW 004)"
            ],
            "status": [
                "active"
            ],
            "company": [
                {
                    "id": [
                        {
                            "_": "3381916",
                            "$": {
                                "type": "integer"
                            }
                        }
                    ],
                    "name": [
                        "Jellyvision"
                    ]
                }
            ]
        };
        var jsObject = {
            "created-on": new Date("2015-09-14 00:00:00"),
            "id": 13061146,
            "last-changed-on": new Date("2015-09-30T15:15:49Z"),
            "name": "RBC Deferred Comp Jellyroll (SOW 004)",
            "status": "active",
            "company": {
                    "id": 3381916,
                    "name": "Jellyvision"
            }
        };
        it("recognizes objects", function() {
            expect(converter.process(xmlObject)).to.deep.equal(jsObject);
            expect(converter.process({
                "_": "Hello World"
            })).to.equal("Hello World");
        });
        it("recognizes arrays", function() {
            expect(converter.process({
                $: {
                    "type": "array"
                },
                "item": [
                    { "test" : "test1"},
                    { "test" : "test2"}
                ]
            })).to.deep.equal([
                    { "test" : "test1"},
                    { "test" : "test2"}
                ]);
        });
        it("recognizes nil elements", function () {
            expect(converter.process( {
                    "$": {
                        "nil": "true"
                    }
                }
            )).to.be.undefined;
        });

    });
});
