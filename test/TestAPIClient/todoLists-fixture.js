var _ = require('lodash');
var FixtureBuilder = require('./FixtureBuilder');

var xmlConverter = require('../../src/lib/xmlConverter');

var todoLists = require('./fixtures/todoLists.json');
var todoListItems = require('./fixtures/todoListItems.json');

var fixtureBuilder = new FixtureBuilder("todo-list", "todo-lists");

var data = {};

_.forEach(todoLists, function (todoList) {
    "use strict";
    var clonedList = _.clone(todoList);
    data[todoList.id] = clonedList;
    clonedList['todo-items'] = _(todoListItems)
        .filter(function (item) {
            return item['todo-list-id'] === todoList.id;
        }).value();

    clonedList.completed = _.all(todoListItems, function(item) { return item.completed });
});

module.exports = fixtureBuilder
    .setData(data)
    .addSingleItemEndpoint()
    .addEndpoint({
        matcher: function (url) {
            "use strict";
            return url.match(new RegExp("/todo_lists.xml\\?responsible_party=(\\d*)"));
        },
        handler: function (url) {
            "use strict";
            var found = this.matcher(url);
            var partyId = found[1];
            var response = {};

            _.forEach(this.data, function (list) {
                var matchingItems = _.filter(list['todo-items'], function (item) {
                    if (_.isEmpty(partyId)) {
                        return _.isUndefined(item["responsible-party-id"]);
                    } else {
                        return item["responsible-party-id"] === +partyId;
                    }
                });

                if (_.size(matchingItems) > 0) {
                    response[list.id] = _.clone(list);
                    response[list.id]['todo-items'] = matchingItems;
                    response[list.id]['completed'] = _.all(list['todo-items'], function (item) { return item.completed; });
                }
            });

            if(_.size(response) > 0) {
                return _.reduce(response, function (response, companyXml) {
                        return response + xmlConverter.toXML(this.singular, companyXml);
                    }, "<" + this.plural + " type=\"array\">", this) + "</" + this.plural + ">";
            }
        }
    })
    .addEndpoint({
        matcher: function (url) {
            "use strict";
            return url.match(new RegExp("/projects/(\\d*)/todo_lists.xml(?:\\?filter=(.*)){0,1}"));
        },
        handler: function (url) {
            "use strict";
            var found = this.matcher(url);
            var projectId = found[1];
            var response =  _.filter(this.data, function (list) {
                return list['project-id'] === + projectId;
            });

            if(_.size(response) > 0) {
                return _.reduce(response, function (response, companyXml) {
                        return response + xmlConverter.toXML(this.singular, companyXml);
                    }, "<" + this.plural + " type=\"array\">", this) + "</" + this.plural + ">";
            }
        }
    })
    .build();