/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util',
    'collections/blog'
], function (app, $, _, Backbone, JST, util, BlogCollection) {
    'use strict';

    var BlogPageView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog-page.ejs'],

        templateBlogListItem: JST['app/scripts/templates/blog-list-item.ejs'],

        events: {
            'click .blog-list li a': 'onBlogListItemSelect'
        },

        initialize: function (options) {
            this.options = options || {};
            $('body').addClass('blog-page');
            app.appView.navBarActivePage(0);
            this.collection = new BlogCollection();
            this.collection.on('reset', this.onBlogListReset, this);
            this.collection.fetch({ reset: true });
        },

        blogListItemSelect: function(blog) {
            var self = this,
                index;

            // blog arg can arrive as index or model
            if (typeof blog === 'number') {
                index = blog;
                blog = this.collection.at(blog);
            } else {
                index = this.collection.indexOf(blog);
            }

            this.$blogEntryContainer = this.$blogEntryContainer ||
                this.$('.blog-entry');
            this.$('.blog-list li.active')
                .removeClass('active'); 
            
            // todo: can't we do some type of client-side caching?
            blog.fetch({
                success: function(blog) {
                    var curUrl = window.location.pathname,
                        url = app.BLOG_ENTRY_URL_PREFIX + blog.get('url');

                    self.$blogEntryContainer.html(
                        util.template('app/scripts/templates/blog-entry.ejs',
                            _.extend(blog.toJSON(), {
                                'BLOG_ENTRY_URL_PREFIX': app.BLOG_ENTRY_URL_PREFIX
                            }))
                    );
                    
                    self.$('.blog-list li:eq(' + index + ')')
                        .addClass('active');
                    
                    if (curUrl !== url) {
                        app.router.navigate(url,
                            { replace: curUrl === '/' || curUrl === '/blog' });
                    }                                

                    self.$el.removeClass('blog-list-on')
                        .addClass('blog-entry-on');
                }
            });
        },

        onBlogListItemSelect: function(e) {
            var $target = $(e.target).eq(0),
                $li = $target[0].tagName.toUpperCase() === 'LI' ?
                    $target : $target.parents('li');

                if ($li.hasClass('active')) { return };
                this.blogListItemSelect($li.index());
                
                return false;
        },

        onBlogListReset: function() {
            var activeBlog;

            app.appView.renderPage(this, {
                collection: this.collection.toJSON()
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

        // todo: consider putting this functionality in a 
        // view base class
        render: function (context) {
            context = context || {};
            context = _.extend(context, {
                'BLOG_ENTRY_URL_PREFIX': app.BLOG_ENTRY_URL_PREFIX
            });
            this.$el.html(util.template(this.template, context));

            return this;
        }
    });

    return BlogPageView;
});
