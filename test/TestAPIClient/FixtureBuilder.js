var _ = require('lodash');
var xmlConverter = require('../../src/lib/xmlConverter');


function FixtureBuilder(singular, plural) {
    "use strict";
    this.singular = singular;
    this.plural = plural;
    this.endpoints = [];
}

FixtureBuilder.prototype.setData = function (data) {
    "use strict";
    this.data = data;
    return this;
};

FixtureBuilder.prototype.addCollectionEndpoint = function () {
    "use strict";
    this.endpoints.push({
        matcher: function (url) {
            return url === "/" + this.plural + ".xml";
        },
        handler: function (url) {
            return _.reduce(this.data, function (response, companyXml) {
                    return response + xmlConverter.toXML(this.singular, companyXml);
                }, "<" + this.plural + " type=\"array\">", this) + "</" + this.plural + ">";
        }
    });
    return this;
};
FixtureBuilder.prototype.addSingleItemEndpoint = function () {
    "use strict";
    this.endpoints.push({
        matcher: function (url) {
            return url.match(new RegExp("/" + this.plural + "/(\\d*).xml"));
        },
        handler: function (url) {
            var found = this.matcher(url);
            if (this.data[found[1]]) {
                return xmlConverter.toXML(this.singular, this.data[found[1]]);
            } else {
                return undefined;
            }
        }
    });
    return this;
};

FixtureBuilder.prototype.addBaseEndpoints = function () {
    "use strict";
    return this.addCollectionEndpoint()
        .addSingleItemEndpoint();
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
        endpoint.data = this.data;
        endpoint.plural = this.plural;
        endpoint.singular = this.singular;

    }, this);

    return fixture;
};

module.exports = FixtureBuilder;