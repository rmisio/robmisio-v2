/*global define*/

define([
    'underscore',
    'backbone',
    'collections/photo'
], function (_, Backbone, PhotoCollection) {
    'use strict';

    var AlbumModel = Backbone.Model.extend({
        urlRoot: '/api/albums/',

        sync: function (method, model, options) {
            if (method === 'read') {
                options.url = model.urlRoot + model.get('slug');
            }

            Backbone.Model.prototype.sync.apply(this, arguments);
        },

        idAttribute: '_id',

        initialize: function () {
        },

        defaults: {
            photos: new PhotoCollection()
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

        toJSON: function () {
            // todo: should i patch backbone to make a more global
            // solution for nested models an collections?
            // https://github.com/jashkenas/backbone/issues/483
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);

            json.photos = json.photos.toJSON();

            return json;
        },

        parse: function (response, options)  {
            var photos = this.get('photos');

            if (photos.length) {
                photos.forEach(function (photo, index) {
                    photo.set('_id', response.photos[index]);
                });

                response.photos = photos;
            } else {
                response.photos = new PhotoCollection(response.photos);
            }

            return response;
        }
    });

    return AlbumModel;
});
