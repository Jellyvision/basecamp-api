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
    todoLists.getListsForProject = function(projectId, filter, cb) {
        if(_.isUndefined(cb)) {
            cb = filter;
            filter = "all";
        }
        client.get("/projects/"+projectId+"/todo_lists.xml", function(err, data) {
            if(err) {
                cb(err);
            } else {
                var todoLists = data['todo-lists'];
                if(filter === "all") {
                    cb(undefined, todoLists);

                } else if(filter === "pending") {
                    cb(undefined, _.filter(todoLists, function (list) {
                        return !list.completed;
                    }));

                } else if(filter === "finished") {
                    cb(undefined, _.filter(todoLists, function (list) {
                        return list.completed;
                    }));
                } else {
                    cb(new Error("Unknown filter: '"+filter+"'"));
                }
            }
        });
    };
    todoLists.getList = function (listId, cb) {
        if(_.isUndefined(cb) || _.isUndefined(listId)) {
            throw new Error("getList needs a list ID");
        } else {
            client.get("/todo-lists/"+listId+".xml", function(err, data) {
                if(err) {
                    cb(err);
                } else {
                    cb(undefined,data['todo-list']);
                }
            });
        }
    };

    return todoLists;
};
