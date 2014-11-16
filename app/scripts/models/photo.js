/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PhotoModel = Backbone.Model.extend({
        initialize: function () {
        },

        parse: function (response, options)  {
            return response;
        }
    });

    return PhotoModel;
});
