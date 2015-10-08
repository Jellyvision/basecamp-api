var _ = require('lodash');

function FixtureBuilder(name) {
    "use strict";
    this.name = name;
    this.endpoints = [];
}

FixtureBuilder.prototype.setData = function (data) {
    "use strict";
    this.data = data;
    return this;
};

FixtureBuilder.prototype.addBaseEndpoints = function () {
    "use strict";
    this.endpoints.push({
        matcher: function (url) {
            return url === "/" + this.name + ".xml";
        },
        handler: function (url) {
            return _.reduce(this.data, function (response, companyXml) {
                    return response + companyXml;
                }, "<" + this.name + " type=\"array\">") + "</" + this.name + ">";
        }
    });
    this.endpoints.push({
        matcher: function (url) {
            return url.match(new RegExp("/" + this.name + "/(\\d*).xml"));
        },
        handler: function (url) {
            var found = this.matcher(url);
            return this.data[found[1]];
        }
    });
    return this;
};

FixtureBuilder.prototype.addEndpoint = function (endpoint) {
    "use strict";
    this.endpoints.push(endpoint);
    return this;
};

FixtureBuilder.prototype.build = function () {
    "use strict";
    var endpoints = this.endpoints;
    var fixture = {
        getEndpoints: function () {
            return endpoints;
        }
    };
    _.forEach(endpoints, function (endpoint) {
        _.forEach(endpoint, function (method, methodName) {
            endpoint.data = this.data;
            endpoint.name = this.name;
        }, this);
    }, this);

    return fixture;
};

module.exports = FixtureBuilder;