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

    var BlogView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog-page.ejs'],

        templateBlogListItem: JST['app/scripts/templates/blog-list-item.ejs'],

        events: {
            'click .blog-list li': 'blogListItemSelect'
        },

        initialize: function (options) {
            this.options = options || {};
            // show progress bar
            this.collection = new BlogCollection();
            this.collection.on('reset', this.onBlogListReset, this);
            this.collection.fetch({ reset: true });
        },

        blogListItemSelect: function(e) {
            var self = this,
                $target = $(e.target).eq(0),
                index = $target[0].tagName.toUpperCase() === 'LI' ?
                    $target.index() : $target.parents('li').index();

            this.$blogEntryContainer = this.$blogEntryContainer ||
                this.$('.blog-entry');
            this.$blogEntryContainer.html(
                app.util.template('app/scripts/templates/blog-entry.ejs',
                    self.collection.at(index).toJSON()));
        },

        onBlogListReset: function() {
            var blog,
                self = this;

            if (this.collection.length) {
                blog = this.options.blogId ?
                    (this.collection.get(this.options.blogId) ||
                    this.collection.at(0)) :
                    this.collection.at(0)
            }

            blog.fetch({
                success: function(blog) {
                    app.appView.showPage(self, {
                        collection: self.collection.toJSON(),
                        blog: blog.toJSON()
                    });
                }
            });
        },

        renderBlogEntry: function() {

        },

        // todo: consider putting this functionality in a 
        // view base class
        render: function (context) {
            this.$el.html(app.util.template(this.template, context));

            return this;
        }
    });

    return BlogView;
});
