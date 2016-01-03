/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'templates',
    'util'
], function ($, _, Backbone, app, JST, util) {
    'use strict';

    var AppView = Backbone.View.extend({
        template: JST['app/scripts/templates/app.ejs'],

        el: '#main-container',

        events: {
            'click #header-main .button-mobile-menu': 'toggleMobileNavMenu'
        },

        initialize: function () {
            var self = this;

            $(document).on('click', 'a:not([data-bypass])', function (evt) {
                var href = $(this).attr('href'),
                    protocol = this.protocol + '//';

                // ignore absolute links
                if (href.slice(0, 4) === 'http') {
                    return;
                }

                if (href.slice(protocol.length) !== protocol) {
                  evt.preventDefault();
                  app.router.navigate(href, true);
                }
            }).on('click', function (e) {
                if (self.$html.hasClass('mobile-menu-open') &&
                    (!$(e.target).parents('.blog-list') ||
                    !$(e.target).hasClass('blog-list'))) {
                    self.closeMobileNavMenu();
                }
            });

            this.render();
            this.$html = $('html');
        },

        navBarActivePage: function (index) {
            this.$headerLinks = this.$headerLinks ||
                this.$('#header-main nav li a');

            this.clearNavBarActivePage();
            this.$headerLinks
                .eq(index)
                .addClass('active');
        },

        clearNavBarActivePage: function () {
            this.$headerLinks = this.$headerLinks ||
                this.$('#header-main nav li a');
                
            this.$headerLinks
                .removeClass('active');
        },

        toggleMobileNavMenu: function (e) {
            this.$html.toggleClass('mobile-menu-open');
            return false;
        },

        closeMobileNavMenu: function() {
            this.$html.removeClass('mobile-menu-open');
        },

        showPage: function (pageView, options) {
            var options = options || {};

            if (this.curPageView) {
                this.curPageView.remove();
                this.$html.removeClass(this.curPageView.pageClass);
                $('html, body').scrollTop(0);
            }

            this.$pageContainer.html(pageView.render().el);
            pageView.onAttach({});
            this.curPageView = pageView;
            this.$html.addClass(pageView.pageClass);
        },

        render: function () {
            this.$el.html(util.template(this.template));
            this.$pageContainer = this.$pageContainer ||
                this.$('#page-container');

            return this;
        }
    });

    return AppView;
});
