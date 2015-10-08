var _ = require('lodash');
var FixtureBuilder = require('./FixtureBuilder');

var data =
    {
        "3610688": '<company>' +
        '<id type="integer">3610688</id>' +
        '<name>Test company</name>' +
        '</company>',
        "1234567": '<company>' +
        '<id type="integer">1234567</id>' +
        '<name>ACME company</name>' +
        '</company>'
    }
    ;

var fixtureBuilder = new FixtureBuilder("companies");

module.exports = fixtureBuilder.setData(data).addBaseEndpoints().build();


