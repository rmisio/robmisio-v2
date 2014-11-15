/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'util',
    'backbone-validation',
    'cloudinary_js',
    'views/page',
    'models/album'
], function (app, $, _, Backbone, JST, util, BackboneValidation, cloudinary, PageView, AlbumModel) {
    'use strict';

    var AlbumPageView = PageView.extend({
        template: JST['app/scripts/templates/album-page.ejs'],

        events: {
            'submit form': 'submit'
        },

        pageClass: 'album-page',

        initialize: function (options) {
            this.options = options || {};

            _.bindAll(this, 'invalidForm', 'renderPhotoUploadInfo');

            this.model = new AlbumModel();
            this.photoUploadInfoModel = new Backbone.Model({
                uploadCount: 0,
                uploadPercent: 0
            }).on('change', this.renderPhotoUploadInfo);

            Backbone.Validation.bind(this, {
                invalid: this.invalidForm
            });


            this.model.set({
                slug: 'fat/ass/pickles',
                title: 'Sonomo Country Living Is Up In Here',
                photos: [{
                    title: 'I like you, do you like me?',
                    caption: 'spanky, wanky and hutch'
                },
                {
                    title: 'Moo shoo pork ass pickles',
                    caption: 'in the west, the sun cried Mariah!'
                }]
            });

            app.appView.showPage(this);
        },

        invalidForm: function(view, attr, error, selector) {
            if (attr === 'photos') {
                Backbone.Validation.callbacks.invalid.apply(
                    Backbone.Validation.callbacks,
                    [this, 'file', error, selector]
                );
            } else {
                Backbone.Validation.callbacks.invalid.apply(
                    Backbone.Validation.callbacks,
                    arguments
                );
            }
        },

        submit: function (e) {
            e.preventDefault();

            this.model.save({
                title: this.$('input[name="title"]').val(),
                photos: []
            });
        },

        renderPhotoUploadInfo: function (uploadCount, uploadPercent) {
            this.$uploadInfoContainer = this.$uploadInfoContainer ||
                this.$('.uploads');
            this.$uploadInfoContainer.html(
                util.template(JST['app/scripts/templates/photo-uploads.ejs'],
                    this.photoUploadInfoModel.toJSON())
            );
        },

        render: function () {
            var context = this.model.toJSON(),
                self = this,
                $fileInput,
                fileInputClasses;

            context.create = this.create;
            this.$el.html(util.template(this.template, context));

            // TODO: Move these 2 elsewhere!!!
            $.cloudinary.config().cloud_name = 'dabzwws4g';
            $.cloudinary.config().upload_preset = 'ceorfqu2';

            var moo = 0;

            $fileInput = this.$('.cloudinary_fileupload'),
            fileInputClasses = $fileInput.attr('class');
            $fileInput
                .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {}, {})
                .on('fileuploadstart', function() {
                    console.log('fileuploadstart');

                    // window['moo' + moo] = arguments;
                    // console.log('moo' + moo);
                }).on('fileuploadsend', function(e, data) {
                    console.log('fileuploadsend');

                    self.photoUploadInfoModel.set('uploadCount',
                        self.photoUploadInfoModel.get('uploadCount') + 1);

                    // window['moo' + moo] = arguments;
                    // console.log('moo' + moo);
                    // moo += 1;
                }).on('cloudinarydone', function(e, data) {
                    console.log('cloudinarydone');

                    self.photoUploadInfoModel.set('uploadCount',
                        self.photoUploadInfoModel.get('uploadCount') - 1);

                    // $('.thumbnails').append($.cloudinary.image(data.result.public_id,
                    //   { format: 'jpg', width: 150, height: 100,
                    //     crop: 'thumb', gravity: 'face', effect: 'saturation:50' } ))}
                }).on('cloudinaryprogressall', function(e, data) {
                    self.photoUploadInfoModel.set('uploadPercent',
                        Math.round((data.loaded * 100.0) / data.total));
                })
                // restore classes plugin seems to be blowing away
                .addClass(fileInputClasses);

            return this;
        }
    });

    return AlbumPageView;
});
