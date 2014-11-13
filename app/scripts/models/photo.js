/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PhotoModel = Backbone.Model.extend({
        url: function () {
            return '/api/photos/' + this.get('url');
        },

        initialize: function () {
        },

        defaults: {
        },

        validate: function (attrs, options) {
        },

        parse: function (response, options)  {
            return response;
        }
    });

    return PhotoModel;
});
