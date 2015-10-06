var _ = require('lodash');
var request = require('request');
var parseString = require('xml2js').parseString;

var convert = function (value, type) {
    "use strict";
    var converters = {
        "string": function (value) {
            return "" + value;
        },
        "date": function (value) {
            return new Date(value + " 00:00:00");
        },
        "datetime": function (value) {
            return new Date(value);
        },
        "integer": function (value) {
            return parseInt(value, 10);
        },
        "array": function(value) {
            return processElement(value);
        },
        "boolean": function (value) {
            return value === "true";
        },
        "undefined": function() {
            return;
        }
    };
    if(!converters[type]) {
        throw new Error("No converter for type: " + type);
    }
    return converters[type](value);
};

var getType = function(element) {
    "use strict";
    if(element.$) {
        if(element.$.type) {
            return element.$.type;
        } else if(element.$.nil) {
            return "undefined";
        } else {
            return "string";
        }
    } else {
        return "string";
    }
};

var processElement = function (element) {
    "use strict";
    if (_.isArray(element)) {
        if (_.size(element) > 1) {
            return _.map(element, processElement);
        } else {
            element = element[0];
        }
    }
    var type = getType(element);
    var value = "";
    if(type === "array") {
        var valueKey = _(element).keys().reject(function(v) { return v === "$" }).first();
        value = element[valueKey];
    } else if (_.isObject(element)) {
        var elementKey = _.keys(element);
        if (!(_.size(elementKey) <= 2 && (elementKey[0] === "_" || elementKey[0] === "$"))) {
            return _.reduce(element, function (reducedElement, value, key) {
                reducedElement[key] = processElement(value);
                return reducedElement;
            }, {});
        } else {
            value = element._ || element;
        }
    }else if(_.isString(element)) {
        value = element;
    }
    return convert(value, type);

};

module.exports = {
    process: processElement
};
