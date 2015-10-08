var _ = require('lodash');

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

module.exports = {
    getEndpoints: function () {
        "use strict";
        return [
            {
                matcher: function(url) { return url === "/companies.xml"; },
                handler: function (url) {
                    return _.reduce(data, function (response, companyXml) {
                            return response + companyXml;

                        }, "<companies type=\"array\">") + "</companies>";
                }
            },
            {
                matcher: function(url) { return url.match(/\/companies\/([^.]*).xml/); },
                handler: function (url) {
                    var found = this.matcher(url);
                    return data[found[1]];
                }
            }
        ];
    }
};
