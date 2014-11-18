/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util'
], function (app, $, _, Backbone, JST, util) {
    'use strict';

    var AlbumPhotoView = Backbone.View.extend({
        template: JST['app/scripts/templates/album-photo.ejs'],

        events: {
            'click .btn-primary': 'submit'
        },

        initialize: function (options) {
            this.options = options || {};

            this.model = this.options.model;
            if (!this.model) {
                throw new Error('Please provide a model.');
            }
        },

        submit: function (e) {
            this.model.set({
                title: this.$('input[name="title"]').val(),
                caption: this.$('input[name="caption"]').val()
            });

            this.trigger('model-data-set');
        },

        render: function () {
            var context = this.model.toJSON();

            this.$el.html(util.template(this.template, context));

            return this;
        }
    });

    return AlbumPhotoView;
});
