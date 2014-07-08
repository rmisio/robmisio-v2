/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/blog'
], function (app, $, _, Backbone, JST, BlogCollection) {
    'use strict';

    var BlogPageView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog-page.ejs'],

        templateBlogListItem: JST['app/scripts/templates/blog-list-item.ejs'],

        events: {
            'click .blog-list li:not(.active)': 'onBlogListItemSelect'
        },

        initialize: function (options) {
            this.options = options || {};
            // show progress bar
            this.collection = new BlogCollection();
            this.collection.on('reset', this.onBlogListReset, this);
            this.collection.fetch({ reset: true });
        },

        blogListItemSelect: function(index) {
            var self = this;

            this.$blogEntryContainer = this.$blogEntryContainer ||
                this.$('.blog-entry');
            this.$('.blog-list li.active')
                .removeClass('active'); 
            
            // todo: can't we do some type of client-side caching?
            this.collection.at(index).fetch({
                success: function(blog) {
                    self.$blogEntryContainer.html(
                        app.util.template('app/scripts/templates/blog-entry.ejs',
                            blog.toJSON()));
                    self.$('.blog-list li:eq(' + index + ')')
                        .addClass('active');
                }
            });
        },

        onBlogListItemSelect: function(e) {
            console.log('can you handle it?');
            var $target = $(e.target).eq(0),
                index = $target[0].tagName.toUpperCase() === 'LI' ?
                    $target.index() : $target.parents('li').index();

                this.blogListItemSelect(index);
        },

        onBlogListReset: function() {
            app.appView.showPage(this, {
                collection: this.collection.toJSON()
            });

            if (this.collection.length) {
                this.blogListItemSelect(0);
            }
        },

        // todo: consider putting this functionality in a 
        // view base class
        render: function (context) {
            this.$el.html(app.util.template(this.template, context));

            return this;
        }
    });

    return BlogPageView;
});
