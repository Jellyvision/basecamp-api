var _ = require('lodash');
var FixtureBuilder = require('./FixtureBuilder');


var data =
    {
        11413096: '<project>' +
        '<created-on type="date">2013-08-21</created-on>' +
        '<id type="integer">11413096</id>' +
        '<last-changed-on type="datetime">2015-10-05T18:37:37Z</last-changed-on>' +
        '<name>Project 1</name>' +
        '<status>active</status>' +
        '<company>' +
        '<id type="integer">3610688</id>' +
        '<name>Test Company</name>' +
        '</company>' +
        '</project>',
        99999999: '<project>' +
        '<created-on type="date">2013-08-21</created-on>' +
        '<id type="integer">99999999</id>' +
        '<last-changed-on type="datetime">2015-10-05T18:37:37Z</last-changed-on>' +
        '<name>Project 2</name>' +
        '<status>active</status>' +
        '<company>' +
        '<id type="integer">1234567</id>' +
        '<name>ACME Company</name>' +
        '</company>' +
        '</project>'

    }
    ;

var fixtureBuilder = new FixtureBuilder("projects");

module.exports = fixtureBuilder
    .setData(data)
    .addBaseEndpoints()
    .addEndpoint({
        matcher: function(url) {
            "use strict";
            return url.match(new RegExp("/"+this.name+"/(\\d*)/companies.xml$"));
        },
        handler: function(url) {
            "use strict";
            var found = this.matcher(url);
            var project = this.data[found[1]];
            if(!project) {
                return undefined;
            } else {
                var companyInfo = project.match(new RegExp("(<company>.*</company>)"));
                return '<companies type="array">' + companyInfo[1] + '</companies>';
            }
        }
    })
    .build();
