/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util',
    'views/page',
    'views/album',
    'models/album'
], function (app, $, _, Backbone, JST, util, PageView, AlbumView, AlbumModel) {
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

        remove: function () {
            this.albumView.remove();
            PageView.prototype.remove.apply(this, arguments);
        },

        render: function () {
            this.$el.html(util.template(this.template, this.model.toJSON()));
            this.albumView = new AlbumView({
                model: this.model
            });
            this.$el.append(this.albumView.render().el);
            this.albumView.onAttach();

            return this;
        }
    });

    return AlbumPageView;
});
