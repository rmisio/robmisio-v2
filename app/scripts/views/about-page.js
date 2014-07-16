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

        quizScrollTop: function () {
            $('html, body').animate({
                scrollTop: this.$('#quiz-results-container').offset().top
            }, 500);
        },

        resetQuiz: function (e) {
            this.$('form')
                .find('.correct-answer, .incorrect-answer')
                .removeClass('correct-answer incorrect-answer')
                .end()
                .find('.has-error-required')
                .removeClass('has-error-required')
                .end()
                .find('input[type=radio]')
                .prop('disabled', false);
            this.$submitButton.prop('disabled', false);
            this.$('.quiz-results').hide();
        },

        inputChange: function (e) {
            $(e.target).parents('.form-group')
                .removeClass('has-error-required');

            if (!this.$('form .has-error-required').length) {
                this.$submitButton.prop('disabled', false);
            }
        },

        submitQuiz: function (e) {
            var self = this,
                requiredError = false,
                score;

            e.preventDefault();
            this.$submitButton.prop('disabled', true);

            // makes sure all fields have a selection
            this.$('.form-group').each(function (i, val) {
                var $inputs = $('input[type=radio]', this);

                if ($inputs.length === $('input[type=radio]:not(:checked)', this).length) {
                    if (!requiredError) {
                        requiredError = true;
                        self.$submitButton.prop('disabled', true);
                    }
                    $(this).addClass('has-error-required');                    
                }
            });

            if (!requiredError) {
                // check if answers are correct
                this.$('input[type=radio]')
                    .prop('disabled', true)
                    .filter(':checked').each(function (i, val) {
                        var $input = $(this);
                        
                        if ($input.attr('data-answer')) {
                            $input.parents('.radio')
                                .addClass('correct-answer');
                        } else {
                            $input.parents('.radio')
                                .addClass('incorrect-answer');
                        }
                    });

                score = Math.round(this.$('.correct-answer').length /
                    this.$('.form-group').length * 100);
                this.$('.quiz-results')
                    .text(score + '%')
                    .show();
            }

            this.quizScrollTop();
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
