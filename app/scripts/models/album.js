/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var AlbumModel = Backbone.Model.extend({
        url: function () {
            return '/api/albums/' + this.get('url');
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

    return AlbumModel;
});
