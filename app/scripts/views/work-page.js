/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util',
    'views/page',
    'data/work'
], function (app, $, _, Backbone, JST, util, PageView, workData) {
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

        render: function () {
            this.$el.html(util.template(this.template, { work: workData }));

            return this;
        }
    });

    return WorkPageView;
});
