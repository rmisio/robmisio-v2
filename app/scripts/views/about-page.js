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

    var AboutPageView = PageView.extend({
        template: JST['app/scripts/templates/about-page.ejs'],

        events: {
            'submit form': 'submitQuiz',
            'reset form': 'resetQuiz',
            'click .try-again': 'resetQuiz',
            'change form input': 'inputChange',
            'click .show-correct': 'toggleCorrect',
            'click #thanksManoj': 'thanksManoj'
        },

        pageClass: 'about-page',

        gradeMessage: {
            0: "There's always next time...",
            60: "Not too shabby!",
            80: "Wah Wah Wee Wah! Great Success!",
            100: "Whoa, perfect score! Mom, is that you?"
        },

        initialize: function (options) {
            this.options = options || {};
            app.appView.showPage(this);
            app.appView.navBarActivePage(1);            
        },

        reAttach: function () {
            PageView.prototype.reAttach.apply(this, arguments);
            app.appView.navBarActivePage(1);
        },        

        thanksManoj: function () {
            // alert('thanks manoj');
            
            // return false;
        },

        toggleCorrect: function (e) {
            // todo: put bar or some space inbweteen links
            if (this.$quiz.hasClass('correct-on')) {
                this.$quiz.removeClass('correct-on');
                this.$quiz.find('.show-correct')
                    .text('show correct');
            } else {
                this.$quiz.addClass('correct-on');
                this.$quiz.find('.show-correct')
                    .text('hide correct');
            }

            return false;
        },

        quizScrollTop: function () {
            $('html, body').animate({
                scrollTop: this.$('#quiz-results-container').offset().top - 10
            }, 500);
        },

        resetQuiz: function (e) {
            if (e.type !== 'reset') {
                this.$('form').trigger('reset');
                return false;
            }

            this.$quiz
                .find('.correct-answer, .incorrect-answer')
                .removeClass('correct-answer incorrect-answer')
                .end()
                .find('.has-error-required')
                .removeClass('has-error-required')
                .end()
                .find('.radio')
                .removeClass('disabled')
                .find('input[type=radio]')
                .prop('disabled', false);
            this.$submitButton.prop('disabled', false);
            this.$('.main-error').hide();
            this.$quiz.removeClass('graded');
            this.quizScrollTop();
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
                score,
                gradeMsg,
                gradeMsgIndex,
                $mainError;

            e.preventDefault();
            this.$submitButton.prop('disabled', true);
            $mainError = this.$('.main-error').hide();

            // makes sure all fields have a selection
            this.$('.form-group').each(function (i, val) {
                var $inputs = $('input[type=radio]', this);

                if ($inputs.length === $('input[type=radio]:not(:checked)', this).length) {
                    if (!requiredError) {
                        requiredError = true;
                        self.$submitButton.prop('disabled', true);
                    }
                    $(this).addClass('has-error-required');
                    $mainError.show();
                }
            });

            if (!requiredError) {
                // check if answers are correct
                this.$('.radio')
                    .addClass('disabled')
                    .find('input[type=radio]')
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
                
                for (var index in this.gradeMessage) {
                    if (score >= index) {
                        gradeMsgIndex = index;
                    }
                }

                gradeMsg = '<span>' + score + '%</span> ' + this.gradeMessage[gradeMsgIndex];
                this.$('.quiz-results')
                    .html(util.template(
                        JST['app/scripts/templates/quiz-results.ejs'],
                        {
                            message: gradeMsg,
                            correctOn: this.$quiz.hasClass('correct-on')
                        }));
                this.$quiz.addClass('graded');
            }

            this.quizScrollTop();
        },

        render: function (context) {
            this.$el.html(util.template(this.template, context));

            // cache selectors
            this.$submitButton = this.$('button[type=submit]');
            this.$quiz = this.$('.quiz');

            this.$('.defer-image').each(function () {
                util.deferImage(this);
            });

            return this;
        }
    });

    return AboutPageView;
});
