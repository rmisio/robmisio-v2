/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PhotoModel = Backbone.Model.extend({
        initialize: function () {
            console.log('new photo model');
        },

        validation: {
            'cloudinary.id': {
              required: true
            }
        },

        parse: function (response, options)  {
            return response;
        }
    });

    return PhotoModel;
});
