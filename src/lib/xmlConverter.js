var _ = require('lodash');
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

var getType = function(element) {
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
    convertXML: function(xml, cb) {
        "use strict";
        parseString(xml, function (err, result) {
            if(err) {
                console.error("[Error]: " + err);
                cb(err);
            } else {
                try {
                    cb(null, processElement(result));
                } catch (ex) {
                    cb(ex);
                }
            }
        });
    }
};
