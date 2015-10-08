var _ = require('lodash');

var data =
    {
        "8675309": '<person>' +
        '<id type="integer">8675309</id>' +
        '<user-name>Test company</user-name>' +
        '</person>',
        "1234567": '<person>' +
        '<id type="integer">1234567</id>' +
        '<user-name>Jim Jimmson</user-name>' +
        '</person>'
    }
    ;

module.exports = {
    getEndpoints: function () {
        "use strict";
        return [
            {
                matcher: function(url) { return url === "/people.xml"; },
                handler: function (url) {
                    return _.reduce(data, function (response, companyXml) {
                            return response + companyXml;

                        }, "<people type=\"array\">") + "</people>";
                }
            },
            {
                matcher: function(url) { return url.match(/\/people\/([^.]*).xml/); },
                handler: function (url) {
                    var found = this.matcher(url);
                    return data[found[1]];
                }
            }
        ];
    }
};
