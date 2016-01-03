/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util',
    'views/page'
], function (app, $, _, Backbone, JST, util, PageView) {
    'use strict';

    var WorkDetailPageView = PageView.extend({
        template: JST['app/scripts/templates/work-detail-page.ejs'],

        events: {
        },

        pageClass: 'work-detail-page',

        initialize: function (options) {
            this.options = options || {};
        },

        render: function () {
            this.$el.html(util.template(this.template, this.options.data));

            return this;
        }
    });

    return WorkDetailPageView;
});