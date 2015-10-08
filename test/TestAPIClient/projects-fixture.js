var _ = require('lodash');

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

module.exports = {
    getEndpoints: function () {
        "use strict";
        return [
            {
                matcher: function(url) { return url === "/projects.xml"; },
                handler: function (url) {
                    return _.reduce(data, function (response, companyXml) {
                            return response + companyXml;
                        }, "<projects type=\"array\">") + "</projects>";
                }
            },
            {
                matcher: function(url) { return url.match(/\/projects\/(\d*).xml$/); },
                handler: function (url) {
                    var found = this.matcher(url);
                    return data[found[1]];
                }
            },
            {
                matcher: function(url) { return url.match(/\/projects\/(\d*)\/companies.xml$/); },
                handler: function(url) {
                    var found = this.matcher(url);
                    var project = data[found[1]];
                    if(!project) {
                        return undefined;
                    } else {
                        var companyInfo = project.match(/(<company>.*<\/company>)/);
                        return '<companies type="array">' + companyInfo[1] + '</companies>';
                    }
                }
            }
        ];
    }
};
