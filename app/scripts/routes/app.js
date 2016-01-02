/*global define*/

define([
    'jquery',
    'backbone',
    'app',
    'views/blog-page',
    'views/work-page',
    'views/about-page',
    'views/album-form',
    'views/album-page',
    'models/album',
    'collections/blog'
], function ($, Backbone, app, BlogPageView, WorkPageView, AboutPageView, AlbumFormView, AlbumPageView, AlbumModel, BlogCollection) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: function () {
            var routes =  {
                '': 'index',
                'blog': 'index',
                'about': 'about',
                'work': 'work',
                'albums/create': 'albumCreate',
                'albums/update/:slug': 'albumUpdate',
                'albums/:slug': 'albumRead',
            };

            routes[app.BLOG_ENTRY_URL_PREFIX + ':year/:month/:slug'] = 'blogPost';

            return routes;
        },

        index: function (options) {
            var self = this,
                options = options || {},
                collection = new BlogCollection(),
                viewOptions = _.extend(options.viewOptions || {},
                    { collection: collection });

            collection.fetch({
                success: function () {
                    self.showPage(BlogPageView, viewOptions);
                }
            });
        },

        showPage: function (View, viewOptions) {
            var view = new View(viewOptions || {});

            app.appView.showPage(view);
        },

        blogPost: function (year, month, slug) {
            var opts = {
                    urlParams: {
                        year: year,
                        month: month,
                        slug: slug
                    }
                };

            this.index({ viewOptions: opts });
        },

        about: function () {
            this.showPage(AboutPageView);
        },

        work: function () {
            this.showPage(WorkPageView);
        },        

        albumCreate: function () {
            this.showPage(AlbumFormView, { model: new AlbumModel() });
        },

        albumUpdate: function (slug) {
            var self = this,
                model;

            if (!slug) {
                // todo: 404 yo
            }

            model = new AlbumModel({
                slug: slug
            });

            model.fetch({
                success: function () {
                    self.showPage(AlbumFormView, { model: model });
                }
            });
        },

        albumRead: function (slug) {
            var self = this,
                model;

            if (!slug) {
                // todo: 404 yo
            }

            model = new AlbumModel({
                slug: slug
            });

            model.fetch({
                success: function () {
                    self.showPage(AlbumPageView, { model: model });
                }
            });
        }
    });

    return AppRouter;
});
