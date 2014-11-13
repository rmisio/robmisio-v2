/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util',
    'cloudinary_js',
    'views/page',
    'models/album'
], function (app, $, _, Backbone, JST, util, cloudinary, PageView, AlbumModel) {
    'use strict';

    var AlbumPageView = PageView.extend({
        template: JST['app/scripts/templates/album-page.ejs'],


        events: {
            'form submit': 'submit'
        },

        pageClass: 'album-page',

        initialize: function (options) {
            this.options = options || {};

            this.create = true;
            this.model = new AlbumModel();

            this.model.set({
                slug: 'fat/ass/pickles',
                title: 'Sonomo Country Living Is Up In Here',
                photos: [{
                    title: 'I like you, do you like me?',
                    caption: 'spanky, wanky and hutch'
                },
                {
                    title: 'Moo sho pork ass pickles',
                    caption: 'in the west, the sun cried Mariah!'
                }]
            });

            app.appView.showPage(this);
        },

        submit: function (e) {
            this.model.set({
                title: this.$('input name=["title"]')
            });
        },

        render: function () {
            var context = this.model.toJSON();

            context.create = this.create;
            this.$el.html(util.template(this.template, context));

            // TODO: Move these 2 elsewhere!!!
            $.cloudinary.config().cloud_name = 'dabzwws4g';
            $.cloudinary.config().upload_preset = 'ceorfqu2';

            var moo = 0;
            this.$('.cloudinary_fileupload')
                .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {}, {})
                .on('fileuploadstart', function() {
                    window['moo' + moo] = arguments;
                    console.log('moo' + moo);
                }).on('cloudinarydone', function(e, data) {
                    // $('.thumbnails').append($.cloudinary.image(data.result.public_id,
                    //   { format: 'jpg', width: 150, height: 100,
                    //     crop: 'thumb', gravity: 'face', effect: 'saturation:50' } ))}
                }).on('cloudinaryprogress', function(e, data) {
                    // $('.progress_bar').css('width',
                    //   Math.round((data.loaded * 100.0) / data.total) + '%');
                });

            return this;
        }
    });

    return AlbumPageView;
});
