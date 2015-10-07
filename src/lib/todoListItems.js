/**
 * Created by danrumney on 9/4/15.
 */
var _ = require('lodash');

module.exports = function (client) {
    "use strict";
    var todoListItems = {
        client: client
    };

    todoListItems.getItemsOnList = function(listId, cb) {
        cb(new Error("Not implemented"));
    };

    todoListItems.getItem = function(itemId, cb) {
        cb(new Error("Not implemented"));
    };

    todoListItems.completeItem = function(itemId, cb) {
        cb(new Error("Not implemented"));
    };

    todoListItems.uncompleteItem = function(itemId, cb) {
        cb(new Error("Not implemented"));
    };

    todoListItems.createItem = function(listId, item, cb) {
        cb(new Error("Not implemented"));
    };

    todoListItems.updateItem = function(itemId, item, cb) {
        cb(new Error("Not implemented"));
    };

    todoListItems.deleteItem = function(itemId, cb) {
        cb(new Error("Not implemented"));
    };


    return todoListItems;
};
