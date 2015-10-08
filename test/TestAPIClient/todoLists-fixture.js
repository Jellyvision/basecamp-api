var _ = require('lodash');
var Factory = require('AutoFixture');
Factory.define('todo-item', [
    'commented-at nil',
    'comments-count',
    'completed',
    'content',
    'created-at',
    'creator-id',
    'due-at',
    'id',
    'position',
    'responsible-party-id',
    'responsible-party-type',
    'todo-list-id',
    'updated-at',
    'responsible-party-name',
    'created-on',
    'creator-name'
]);

module.exports = {
    getEndpoints: function () {
        "use strict";
        return [
            {
                matcher: function(url) { return url === "/todo_lists.xml"; },
                handler: function (url) {
                    return _.reduce(data, function (response, companyXml) {
                            return response + companyXml;
                        }, "<todo-lists type=\"array\">") + "</todo-lists>";
                }
            },
            {
                matcher: function(url) { return url.match(/\/todo_lists.xml\?responsible_party=(\d*)$/); },
                handler: function (url) {
                    var found = this.matcher(url);
                    return data[found[1]];
                }
            },
            {
                matcher: function(url) { return url.match(/\/todo_lists\/(\d*)\/companies.xml$/); },
                handler: function(url) {
                    var found = this.matcher(url);
                    var project = data[found[1]];
                    if(!project) {
                        return;
                    } else {
                        var companyInfo = project.match(/(<company>.*<\/company>)/);
                        return '<todo-lists type="array">' + companyInfo[1] + '</todo-lists>';
                    }
                }
            }
        ];
    }
};
