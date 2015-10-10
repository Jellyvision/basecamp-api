var _ = require('lodash');

var getType = function(value) {
    "use strict";
    return    /^\d{4}-\d{2}-\d{2}$/.test(value) ? "date"
            : /^\d{4}-\d{2}-\d{2}/.test(value)  ? "datetime"
            : _.isNumber(value)                 ? "integer"
            : _.isBoolean(value)                ? "boolean"
            : _.isArray(value)                  ? "array"
            : _.isString(value)                 ? undefined
            : _.isObject(value)                 ? "object"
            :                                     undefined;

};

var xmlify = function (name, data) {
    "use strict";
    return _.reduce(data, function(string, value, key) {
            var type = getType(value);
            return string + (type === "object" ? xmlify(key, value) :
                "<"+key+ (type ? " type='"+type+"'" : "") +">" +
                value +
                "</"+key+">");


    },"<"+name+">") + "</"+name+">";

};


module.exports = xmlify;