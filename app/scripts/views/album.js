/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util',
    'views/page',
    'models/album'
], function (app, $, _, Backbone, JST, util, PageView, AlbumModel) {
    'use strict';

    var AlbumView = Backbone.View.extend({
        template: JST['app/scripts/templates/album.ejs'],

        initialize: function (options) {
            this.options = options || {};

            this.model = this.options.model;
            if (!this.model || (!this.model instanceof AlbumModel)) {
                throw new Error('Please provide a AlbumModel.');
            }

            this.respPhotos = [];
        },

        // call from parent view as appropriate
        onAttach: function () {
            var self = this;

            this.$('.photo').each(function () {
                // todo: second onresize handler (the one on the
                // actual img tag) is not being unbound!
                self.respPhotos.push(util.responsivePhoto(this));
            });
        },

        // call from parent view as appropriate
        remove: function () {
            _.each(this.respPhotos, function (respPhoto) {
                respPhoto.unbind();
            });
        },

        render: function () {
            this.$el.html(util.template(this.template, this.model.toJSON()));

            return this;
        }
    });

    return AlbumView;
});
