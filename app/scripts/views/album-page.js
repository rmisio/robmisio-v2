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

    var AlbumPageView = PageView.extend({
        template: JST['app/scripts/templates/album-page.ejs'],

        events: {
        },

        pageClass: 'album-page',

        initialize: function (options) {
            this.options = options || {};

            this.model = this.options.model;
            if (!this.model || (!this.model instanceof AlbumModel)) {
                throw new Error('Please provide a AlbumModel.');
            }

            this.respPhotos = [];
        },

        onAttach: function () {
            var self = this;

            this.$('.photo').each(function () {
                self.respPhotos.push(util.responsivePhoto(this));
            });
        },

        remove: function () {
            console.log('vroom vroom');
            window.vroom = this.respPhotos;

            _.each(this.respPhotos, function (respPhoto) {
                respPhoto.unbind();
            });

            PageView.prototype.remove.call(this);
        },

        render: function () {
            // todo: move this right NOW!!!
            $.cloudinary.config().cloud_name = 'dabzwws4g';
            $.cloudinary.config().upload_preset = 'ceorfqu2';

            this.$el.html(util.template(this.template, this.model.toJSON()));

            return this;
        }
    });

    return AlbumPageView;
});
