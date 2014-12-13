/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'util',
    'views/base-photo-blog',
    'models/album'
], function (app, $, _, Backbone, util, BasePhotoBlogView, AlbumModel) {
    'use strict';

    var HappyHoliView = BasePhotoBlogView.extend({
        albums: [
            new AlbumModel({ slug: 'happy-holi' })
        ],

        events: {
        },

        initialize: function (options) {
            this.options = options || {};
        },

        render: function (context) {
            context = context || {};
            this.$el.html(util.template(this.options.template, context));
            BasePhotoBlogView.prototype.render.apply(this, arguments);

            return this;
        }
    });

    return HappyHoliView;
});
