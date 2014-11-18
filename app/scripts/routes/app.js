/*global define*/

define([
    'jquery',
    'backbone',
    'app',
    'views/blog-page',
    'views/about-page',
    'views/album-form',
    'models/album'
], function ($, Backbone, app, BlogPage, AboutPage, AlbumForm, AlbumModel) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: function () {
            var routes =  {
                '': 'index',
                'blog': 'index',
                'about': 'about',
                'album/create': 'albumCreate',
                'album/update/:slug': 'albumUpdate'

            };

            routes[app.BLOG_ENTRY_URL_PREFIX + ':year/:month/:slug'] = 'blogPost';

            return routes;
        },

        pageViews: {},

        index: function () {
            this.showPage('blog', BlogPage);
        },

        // todo: rename plural
        getCacheUrl: function (view) {
            var urls = [];

            if (typeof view.cacheUrl === 'function') {
                urls = view.cacheUrl();
                urls = typeof urls === 'string' ? [urls] : urls;
            } else if (view.cacheUrl) {
                urls = [view.cacheUrl];
            } else if (view._cacheUrl) {
                urls = [view._cacheUrl];
            }

            return urls;
        },

        showPage: function (url, View, options) {
            var curPageView = app.appView.getCurPageView(),
                view;

            options = options || {};

            if (curPageView && curPageView.cache) {
                for (var i = 0, curPageUrls = this.getCacheUrl(curPageView);
                    i < curPageUrls.length; i++) {
                    this.pageViews[curPageUrls[i]] = curPageView;
                }
            }

            view = this.pageViews[url];

            if (view && this.getCacheUrl(view).indexOf(url) !== -1) {
                app.appView.showPage(view, { reAttach: true });
            } else {
                view = this.pageViews[url] = new View(options.viewOptions);

                if (view.cache && !view.cacheUrl) {
                    view._cacheUrl = url;
                }
            }

            return view;
        },

        blogPost: function (year, month, slug) {
            var opts = {
                    urlParams: {
                        year: year,
                        month: month,
                        slug: slug
                    }
                };

            var url = app.BLOG_ENTRY_URL_PREFIX + year + '/' + month + '/' + slug;

            this.showPage(url, BlogPage, { viewOptions: opts });
        },

        about: function () {
            this.showPage('about', AboutPage);
        },

        albumCreate: function () {
            this.showPage('album/create', AlbumForm, {
                viewOptions: {
                    model: new AlbumModel()
                }
            });
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
                    self.showPage('album/update/' + slug, AlbumForm, {
                        viewOptions: {
                            model: model
                        }
                    });
                },

                error: function (model, jqxhr) {
                    if (jqxhr.status === 404) {
                        // todo: 404 yo
                    }
                }
            });
        }
    });

    return AppRouter;
});
