/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function (app, $, _, Backbone, JST) {
    'use strict';

    var AboutPageView = Backbone.View.extend({
        template: JST['app/scripts/templates/about-page.ejs'],

        events: {
        },

        initialize: function (options) {
            this.options = options || {};

            app.appView.renderPage(this);            
        },

        render: function (context) {
            this.$el.html(app.util.template(this.template, context));

            return this;
        }
    });

    return AboutPageView;
});
