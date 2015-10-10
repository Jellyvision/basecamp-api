var _ = require('lodash');
var FixtureBuilder = require('./FixtureBuilder');

var fixtureBuilder = new FixtureBuilder("company", "companies");

module.exports = fixtureBuilder
    .setData(require('./fixtures/companies.json'))
    .addBaseEndpoints()
    .build();


