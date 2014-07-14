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
            var self = this;

            $(document).on('click', 'a:not([data-bypass])', function (evt) {
                var href = $(this).attr('href'),
                    protocol = this.protocol + '//';

                if (href.slice(protocol.length) !== protocol) {
                  evt.preventDefault();
                  app.router.navigate(href, true);
                }
            }).on('click', function (e) {
                if (self.$body.hasClass('mobile-menu-open') &&
                    (!$(e.target).parents('.blog-list') ||
                    !$(e.target).hasClass('blog-list'))) {
                    self.closeMobileNavMenu();
                }
            });

            $(window).resize(function (e) {
                setTimeout(function () {
                    self.setMobileNavMenuHeight();
                    // if (self.$body.hasClass('mobile-menu-open')) {
                    //     self.setMobileNavMenuHeight.call(self);
                    // }
                    // todo: should remove max-height setting if
                    // not .mobile-menu-open or possibly on
                    // mq change event
                }, 0);
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

        setMobileNavMenuHeight: function () {
            this.$blogList =  this.$blogList || this.$('.blog-list');

            if (this.$body.hasClass('mobile-menu-open')) {
                this.$blogList.css('maxHeight', $(window).height() -
                    parseInt(this.$blogList.css('top')));
            }            
        },

        toggleMobileNavMenu: function (e) {
            this.$body.toggleClass('mobile-menu-open');
            return false;
        },

        closeMobileNavMenu: function() {
            this.$body.removeClass('mobile-menu-open');
        },

        renderPage: function (pageView, context) {
            // todo: consider caching some or all pages
            if (this.curPageView) {
                this.$body.removeClass(this.curPageView.pageClass);
                this.curPageView.remove();
            }

            this.curPageView = pageView;
            this.$body.addClass(pageView.pageClass);
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