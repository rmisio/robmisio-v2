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

    var WorkPageView = PageView.extend({
        template: JST['app/scripts/templates/work-page.ejs'],

        events: {
        },

        pageClass: 'work-page',

        initialize: function (options) {
            this.options = options || {};
        },

        onAttach: function (e) {
            PageView.prototype.onAttach.apply(this, arguments);
            app.appView.navBarActivePage(2);
        },

        render: function (context) {
            this.$el.html(util.template(this.template, context));

            // cache selectors

            return this;
        }
    });

    return WorkPageView;
});
