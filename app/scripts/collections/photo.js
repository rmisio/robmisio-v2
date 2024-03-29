/*global define*/

define([
    'underscore',
    'backbone',
    'models/photo'
], function (_, Backbone, PhotoModel) {
    'use strict';

    var PhotoCollection = Backbone.Collection.extend({
        model: PhotoModel
    });

    return PhotoCollection;
});
