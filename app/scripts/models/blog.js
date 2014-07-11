/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var BlogModel = Backbone.Model.extend({
        url: function () {
            return '/api/blogs/' + this.get('url');
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

    return BlogModel;
});
