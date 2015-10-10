var _ = require('lodash');
var FixtureBuilder = require('./FixtureBuilder');
var xmlify = require('./xmlify');


var todoLists = require('./fixtures/todoLists.json');
var todoListItems = require('./fixtures/todoListItems.json');

var fixtureBuilder = new FixtureBuilder("todo-lists");

var data = {};

module.exports = fixtureBuilder
    .setData(data)
    .addEndpoint({
        matcher: function (url) {
            "use strict";
            return url.match(new RegExp("/todo_lists.xml\?responsible_party=(\d*)"));
        },
        handler: function (url) {
            "use strict";
            var found = this.matcher(url);
            if(this.data[found[1]]) {
                return xmlify(this.singular, this.data[found[1]])   ;
            } else {
                return undefined;
            }
        }
    })
    .build();