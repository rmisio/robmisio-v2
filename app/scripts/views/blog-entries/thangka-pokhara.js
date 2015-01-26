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

    var ThangkaPokharaView = BasePhotoBlogView.extend({
        albums: [
            new AlbumModel({ slug: 'thangka-pokhara' })
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

    return ThangkaPokharaView;
});
