/*global define*/

define([
    'underscore',
    'backbone',
    'models/blog'
], function (_, Backbone, BlogModel) {
    'use strict';

    var BlogCollection = Backbone.Collection.extend({
        url: '/api/blogs',
        
        model: BlogModel
    });

    return BlogCollection;
});
