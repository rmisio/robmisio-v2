/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/blog'
], function ($, _, Backbone, JST, BlogCollection) {
    'use strict';

    var BlogView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog-page.ejs'],

        templateBlogListItem: JST['app/scripts/templates/blog-list-item.ejs'],

        events: {},

        initialize: function () {
            this.collection = new BlogCollection();
            this.collection.on('reset', this.renderBlogList, this);

            this.$blogListContainer = this.$('.blog-list');
            this.$blogEntryContainer = this.$('.blog-entry');

            this.collection.fetch({ reset: true });
        },

        createdAtVerbose: function(createdAt) {
            return '10 minutes ago';
        },

        addBlogListItem: function (blog) {
            this.$blogListContainer.append(this.templateBlogListItem(
                _.extend(blog.toJSON(), { createdAtVerbose: this.createdAtVerbose() })
            ));
        },

        renderBlogList: function() {
            console.log('wilber');
            this.collection.each(this.addBlogListItem, this);
        },

        renderBlogEntry: function() {

        },

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });

    return BlogView;
});
