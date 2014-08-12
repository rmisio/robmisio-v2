/*global define*/

define([
    'jquery',
    'backbone',
    'app',
    'views/blog-page',
    'views/about-page'
], function ($, Backbone, app, BlogPage, AboutPage) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: function () {
            var routes =  {
                '': 'index',
                'blog': 'index',
                'posts/:year/:month/:slug': 'blogPost',
                'about': 'about'
            };

            routes[app.BLOG_ENTRY_URL_PREFIX + ':year/:month/:slug'] =
                'blogPost';

            return routes;
        },

        index: function () {
            var url = 'blog';
 
            this.showPage('blog', BlogPage);
        },

        pageViews: {},

        showPage: function (url, View) {
            var view = this.pageViews[url],
                cacheUrls,
                createNew = true;

            // if (this.curPageView && this.curPageView.cache) {
            //     if (typeof view.cacheUrl === 'function') {
            //         cacheUrls = view.cacheUrl();
            //     } else if (view.cacheUrl) {
            //         cacheUrls = view.cacheUrl;
            //     } else {
            //         cacheUrls = view._cacheUrl;
            //     }

            //     cacheUrls = typeof === 'string' ? [cacheUrls] :
            //         cacheUrls;

            //     this.
            // }

            // cacheUrls = null;
            if (view) {
                console.log('boom');
                if (typeof view.cacheUrl === 'function') {
                    console.log('zoom');
                    cacheUrls = view.cacheUrl();
                    cacheUrls = typeof cacheUrls === 'string' ? [cacheUrls]
                        : cacheUrls;

                    if (cacheUrls.indexOf('url') !== -1) {
                        console.log('swooom');
                        view.reAttach(app.appView.getPageContainer());
                        createNew = false;
                    }
                } else if ((view.cacheUrl === 'url') ||
                    (view._cacheUrl === 'url')) {
                    console.log('vrooom');
                    view.reAttach(app.appView.getPageContainer());
                    createNew = false;
                }
            }

            if (createNew) {
                console.log('loomer');
                view = this.pageViews[url] = new View();
                if (view.cache && !view.cacheUrl) {
                    view._cacheUrl = url;
                }
            }

            this.curPageView = view;
            return view;
        },

        blogPost: function (year, month, slug) {
            new BlogPage({
                urlParams: {
                    year: year,
                    month: month,
                    slug: slug
                }
            });
        },

        about: function () {
            new AboutPage();
        }        
    });

    return AppRouter;
});
