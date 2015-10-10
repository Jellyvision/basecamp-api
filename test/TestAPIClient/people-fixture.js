var FixtureBuilder = require('./FixtureBuilder');
var fixtureBuilder = new FixtureBuilder("person", "people");

module.exports = fixtureBuilder.setData(require('./fixtures/people.json'))
    .addBaseEndpoints()
    .build();
