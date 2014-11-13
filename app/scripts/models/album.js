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
            photos: []
        },

        validate: function (attrs, options) {
            var error = {};

            if (!attrs.title) {
                error.title = 'Title is required.';
            } else if (!photos.length) {
                error.photos = 'At least one photo is required.';
            }

            if (_.size(error)) { return error; }
        },

        parse: function (response, options)  {
            return response;
        }
    });

    return AlbumModel;
});
