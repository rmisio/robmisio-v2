/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'templates'
], function ($, _, Backbone, app, JST) {
    'use strict';

    var AppView = Backbone.View.extend({
        template: JST['app/scripts/templates/app.ejs'],

        el: '#main-container',

        events: {
            'click #header-main .button-mobile-menu': 'toggleMobileNavMenu'
        },

        initialize: function () {
            $(document).on('click', 'a:not([data-bypass])', function (evt) {
                var href = $(this).attr('href'),
                    protocol = this.protocol + '//';

                if (href.slice(protocol.length) !== protocol) {
                  evt.preventDefault();
                  app.router.navigate(href, true);
                }
            });

            this.render();
            this.$body = $('body');
        },

        navBarActivePage: function (index) {
            this.$('#header-main nav li a')
                .removeClass('active')
                .eq(index)
                .addClass('active');
        },

        toggleMobileNavMenu: function (e) {
            this.$body.toggleClass('mobile-menu-open');
            return false;
        },

        renderPage: function (pageView, context) {
            // todo: consider caching some or all pages
            if (this.curPageView) {
                this.curPageView.remove();
            }

            this.curPageView = pageView;
            this.$pageContainer = this.$pageContainer ||
                this.$('#page-container');
            this.$pageContainer.append(pageView.render(context).el);
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });

    return AppView;
});