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
        },

        onAttach: function () {
            this.$('.photo').each(function () {
                util.responsivePhoto(this);
            });
        },

        render: function () {
            var context = this.model.toJSON();

            $.cloudinary.config().cloud_name = 'dabzwws4g';
            $.cloudinary.config().upload_preset = 'ceorfqu2';
            context.$ = $;

            this.$el.html(util.template(this.template, context));

            return this;
        }
    });

    return AlbumPageView;
});
