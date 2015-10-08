/**
 * Created by danrumney on 9/4/15.
 */
var _ = require('lodash');

module.exports = function (client) {
    "use strict";
    var todoLists = {
        client: client
    };

    todoLists.getToDoListsForUser = function(responsibleParty, cb) {
        if(_.isUndefined(cb)) {
            cb = responsibleParty;
            responsibleParty = "";
        }
        client.get("/todo_lists.xml?responsible_party="+responsibleParty, function(err, data) {
            if(err) {
                cb(err);
            } else {
                cb(undefined,data['todo-lists']);
            }
        });
    };
    todoLists.getToDoListsThatAreNotAssigned = function(cb) {
        client.get("/todo_lists.xml?responsible_party=", function(err, data) {
            if(err) {
                cb(err);
            } else {
                cb(undefined,data['todo-lists']);
            }
        });
    };

    return todoLists;
};
