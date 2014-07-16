/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util'
], function (app, $, _, Backbone, JST, util) {
    'use strict';

    var AboutPageView = Backbone.View.extend({
        template: JST['app/scripts/templates/about-page.ejs'],

        events: {
            'submit form': 'submitQuiz',
            'reset form': 'resetQuiz',
            'change form input': 'inputChange'
        },

        initialize: function (options) {
            this.options = options || {};
            app.appView.navBarActivePage(1);
            app.appView.renderPage(this);            
        },

        resetQuiz: function (e) {
            this.$('form .has-error-required')
                .removeClass('has-error-required');
            this.$submitButton.removeAttr('disabled');
        },

        inputChange: function (e) {
            $(e.target).parents('.form-group')
                .removeClass('has-error-required');

            if (!this.$('form .has-error-required').length) {
                this.$submitButton.removeAttr('disabled');
            }
        },

        submitQuiz: function (e) {
            var self = this,
                disabledSubmit = false;

            e.preventDefault();

            this.$inputs = this.$inputs ||
                this.$('input[type=radio]');

            // makes sure all fields have a selection
            this.$('input[type=radio]:not(:checked)').each(function (i, input) {
                !disabledSubmit && self.$submitButton.attr('disabled', '');
                $(input).parents('.form-group')
                    .addClass('has-error-required');
            });
        },

        render: function (context) {
            this.$el.html(util.template(this.template, context));

            // cache selectors
            this.$submitButton = this.$('button[type=submit]');

            return this;
        }
    });

    return AboutPageView;
});
