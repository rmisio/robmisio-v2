/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'google-code-prettify',
    'templates',
    'util',
    'views/page',
    'collections/blog',
], function (app, $, _, Backbone, prettify, JST, util, PageView, BlogCollection) {
    'use strict';

    var BlogPageView = PageView.extend({
        template: JST['app/scripts/templates/blog-page.ejs'],

        templateBlogListItem: JST['app/scripts/templates/blog-list-item.ejs'],

        events: {
            'click .blog-list li a': 'onBlogListItemSelect'
        },

        pageClass: 'blog-page',

        initialize: function (options) {
            this.options = options || {};
            app.appView.navBarActivePage(0);
            this.collection = new BlogCollection();
            this.listenTo(this.collection, 'reset', this.onBlogListReset);
            this.listenTo(app.eventEmitter, app.e.MQ_CHANGE, this.onMqChange);
            this.collection.fetch({ reset: true });
        },

        reAttach: function () {
            PageView.prototype.reAttach.apply(this, arguments);
            app.appView.navBarActivePage(0);
        },

        cacheUrl: function () {
            var curBlogUrl = this.$blogList
                .find('.active a')
                .attr('href');

            return ['',
                'blog',
                curBlogUrl.slice(1)
            ];
        },

        onMqChange: function (on, off) {
            if (on.indexOf('maxPhoneLandscape') !== -1) {
                this.setMobileNavMenuHeight();
            } if (off.indexOf('maxPhoneLandscape') !== -1) {
                this.clearMobileNavMenuHeight();
            }
        },

        setMobileNavMenuHeight: function () {
            this.$blogList.css('maxHeight', $(window).height() -
                parseInt(this.$blogList.css('top')));
        },        

        clearMobileNavMenuHeight: function () {
            this.$blogList.attr('style', function (i, style) {
                return style ? style.replace(/max-height[^;]+;?/g, '') :
                    '';
            });
        },

        blogListItemSelect: function (blog) {
            var self = this,
                index,
                fadeOut;

            // blog arg can arrive as index or model
            if (typeof blog === 'number') {
                index = blog;
                blog = this.collection.at(blog);
            } else {
                index = this.collection.indexOf(blog);
            }

            this.$blogEntryContainer = this.$blogEntryContainer ||
                this.$('.blog-entry');
            fadeOut = this.$blogEntryContainer.animate({ opacity: 0 }, 300, function () {
                $(this).empty();
            }).promise();
            this.$('.blog-list li.active')
                .removeClass('active');
            this.$('.blog-list li:eq(' + index + ')')
                .addClass('active');
            this.$html = this.$html || $('html');
            this.$html.addClass('fetching-blog');
            app.appView.closeMobileNavMenu();

            // todo: can't we do some type of client-side caching?
            blog.fetch({
                success: function (blog) {
                    var url = app.BLOG_ENTRY_URL_PREFIX + blog.get('url');

                    fadeOut.done(function () {
                        self.$html.removeClass('fetching-blog');
                        self.$blogEntryContainer.html(
                            util.template('app/scripts/templates/blog-entry.ejs',
                                _.extend(blog.toJSON(), {
                                    'BLOG_ENTRY_URL_PREFIX': app.BLOG_ENTRY_URL_PREFIX
                                }))
                        ).animate({ opacity: 1 }, 300);

                        self.$blogEntryContainer.find('code, pre')
                            .each(function () {
                                var $this = $(this);
                                
                                $this.addClass('prettyprint')
                                    .html(prettify.prettyPrintOne($this.html()));
                            });
                    });
                    
                    self.navigateBlogEntry(url);
                }
            });
        },

        navigateBlogEntry: function (url) {
            var curUrl = window.location.pathname;

            if (curUrl !== url) {
                app.router.navigate(url,
                    { replace: curUrl === '/' || curUrl === '/blog' });
            }
        },

        onBlogListItemSelect: function (e) {
            var $target = $(e.target).eq(0),
                $li = $target[0].tagName.toUpperCase() === 'LI' ?
                    $target : $target.parents('li');

                if ($li.hasClass('active')) { return };
                this.blogListItemSelect($li.index());
                
                return false;
        },

        onBlogListReset: function () {
            var activeBlog;

            app.appView.showPage(this, {
                context : { collection: this.collection.toJSON() }
            });

            if (this.collection.length) {
                if (this.options.urlParams) {
                    activeBlog = this.collection.findWhere({
                        url: this.options.urlParams.year + '/' +
                            this.options.urlParams.month + '/' +
                            this.options.urlParams.slug
                    });
                }

                this.blogListItemSelect(activeBlog || 0);
            }
        },

        onAttach: function (e) {
            if (!e.cache) {
                if (util.mq.maxPhoneLandscape()) {
                    this.setMobileNavMenuHeight();
                }
            } else {
                this.navigateBlogEntry(
                    this.$blogList
                        .find('.active a')
                        .attr('href')
                    );
            }
        },

        remove: function () {
            this.clearMobileNavMenuHeight();

            Backbone.View.prototype.remove.call(this);
        },

        // todo: consider putting this functionality in a 
        // view base class
        render: function (context) {
            context = context || {};
            context = _.extend(context, {
                'BLOG_ENTRY_URL_PREFIX': app.BLOG_ENTRY_URL_PREFIX
            });
            this.$el.html(util.template(this.template, context));

            // cache selectors
            this.$blogList =  this.$('.blog-list');

            return this;
        }
    });

    return BlogPageView;
});
