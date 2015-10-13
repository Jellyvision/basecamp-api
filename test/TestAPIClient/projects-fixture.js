var FixtureBuilder = require('./FixtureBuilder');
var xmlConverter = require('../../src/lib/xmlConverter');

var fixtureBuilder = new FixtureBuilder("project", "projects");

module.exports = fixtureBuilder
    .setData(require('./fixtures/projects.json'))
    .addBaseEndpoints()
    .addEndpoint({
        matcher: function(url) {
            "use strict";
            return url.match(new RegExp("/"+this.plural+"/(\\d*)/companies.xml$"));
        },
        handler: function(url) {
            "use strict";
            var found = this.matcher(url);
            var project = this.data[found[1]];
            if(!project) {
                return undefined;
            } else {
                var companyInfo = project.company;
                return "<companies type='array'>" + xmlConverter.toXML('company', companyInfo) + "</companies>";
            }
        }
    })
    .build();
