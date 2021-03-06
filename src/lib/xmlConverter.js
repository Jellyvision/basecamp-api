var _ = require('lodash');
var parseString = require('xml2js').parseString;
var winston = require('winston');

var processElement;
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
            var processedElement = processElement(value);
            if(_.isArray(processedElement)) {
                return processedElement;
            } else {
                return [processedElement];
            }
        },
        "boolean": function (value) {
            return value === "true";
        },
        "identity" : function (value) {
            return value;
        },
        "undefined": function() { }
    };
    if(!converters[type]) {
        throw new Error("No converter for type: " + type +". Value is: " + value);
    }
    return converters[type](value);
};

var getTypeFromXML = function(element) {
    "use strict";
    if(element.$) {
        if(element.$.type) {
            return element.$.type;
        } else if(element.$.nil) {
            return "undefined";
        } else {
            return "identity";
        }
    } else {
        return "identity";
    }
};

var getTypeFromJS = function(value) {
    "use strict";
    return    /^\d{4}-\d{2}-\d{2}$/.test(value) ? "date"
        : /^\d{4}-\d{2}-\d{2}/.test(value)      ? "datetime"
        : _.isNumber(value)                     ? "integer"
        : _.isBoolean(value)                    ? "boolean"
        : _.isArray(value)                      ? "array"
        : _.isString(value)                     ? undefined
        : _.isObject(value)                     ? "object"
        :                                         undefined;

};

var equalsValuePredicate = function (val) {
    "use strict";
    return function(test) {
        return val === test;
    };
};

function isCompositeElement(element) {
    "use strict";
    var elementKey = _.keys(element);
    return !(_.size(elementKey) <= 2 && (elementKey[0] === "_" || elementKey[0] === "$"));
}

function processObject(element) {
    "use strict";
    if (isCompositeElement(element)) {
        return _.reduce(element, function (reducedElement, value, key) {
            reducedElement[key] = processElement(value);
            return reducedElement;
        }, {});
    } else {
        return element._ || element;
    }
}

processElement = function (element) {
    "use strict";
    if (_.isArray(element)) {
        if (_.size(element) > 1) {
            return _.map(element, processElement);
        } else {
            element = element[0];
        }
    }
    var type = getTypeFromXML(element);
    var value = "";

    if(type === "array") {
        var valueKey = _(element).keys().reject(equalsValuePredicate("$")).first();
        value = element[valueKey];
    } else if (_.isObject(element)) {
        value = processObject(element);
    } else if(_.isString(element)) {
        type = "string";
        value = element;
    }

    return convert(value, type);

};

module.exports = {
    process: processElement,
    fromXML: function(xml, cb) {
        "use strict";
        parseString(xml, function (err, result) {
            if(err) {
                winston.error("[Error]: " + err);
                cb(err);
            } else {
                try {
                    cb(null, processElement(result));
                } catch (ex) {
                    cb(ex);
                }
            }
        });
    },
    toXML: function _xmlify(name, data) {
        "use strict";
        return _.reduce(data, function(string, value, key) {
                var type = getTypeFromJS(value);
                return string + (type === "object" ? _xmlify(key, value) :
                    "<"+key+ (type ? " type='"+type+"'" : "") +">" +
                    value +
                    "</"+key+">");


            },"<"+name+">") + "</"+name+">";

    }
};
