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

        validation: {
            title: {
              required: true
            },
            photos: function (value) {
                if (!value.length) {
                    return 'At least one photo is required.';
                }
            }
        },

        parse: function (response, options)  {
            return response;
        }
    });

    return AlbumModel;
});
