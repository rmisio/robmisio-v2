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
    'views/album-photo',
    'models/album',
    'collections/photo'
], function (app, $, _, Backbone, JST, util, BackboneValidation, cloudinary,
        PageView, AlbumPhotoView, AlbumModel, PhotoCollection) {
    'use strict';

    var AlbumPageView = PageView.extend({
        template: JST['app/scripts/templates/album-page.ejs'],

        events: {
            'submit .album-form': 'submit',
            'click .remove-thumb': 'photoThumbRemove',
            'click .photo-thumb': 'photoThumbClick'
        },

        pageClass: 'album-page',

        initialize: function (options) {
            this.options = options || {};

             _.bindAll(this, 'invalidForm');

            this.model = new AlbumModel();
            this.photoCollection = new PhotoCollection();
            this.photoUploadInfoModel = new Backbone.Model({
                uploadCount: 0,
                uploadPercent: 0
            });

            this.listenTo(this.photoUploadInfoModel, 'change',
                this.renderPhotoUploadInfo, this);
            this.listenTo(this.photoCollection, 'add', this.photoAdd, this);
            this.listenTo(this.photoCollection, 'remove', this.photoRemove, this);

            // this.model.set({
            //     photos: [
            //     {
            //         cloudinary: {
            //             id: "bbel1xqvpyzbhgbmex5x",
            //             data: {
            //                 version: 1416101351,
            //                 signature: "cec3123196349fc3a5da38c8fca83dc13b64f05b",
            //                 width: 2592,
            //                 height: 1456,
            //                 format: "jpg",
            //                 resource_type: "image",
            //                 created_at: "2014-11-16T01:29:11Z",
            //                 bytes: 1511177,
            //                 type: "upload",
            //                 etag: "0316193b06f2062ce2cb32f27a5d03b5",
            //                 url: "http://res.cloudinary.com/dabzwws4g/image/upload/v1416101351/bbel1xqvpyzbhgbmex5x.jpg",
            //                 secure_url: "https://res.cloudinary.com/dabzwws4g/image/upload/v1416101351/bbel1xqvpyzbhgbmex5x.jpg",
            //                 path: "v1416101351/bbel1xqvpyzbhgbmex5x.jpg"
            //             }
            //         }
            //     }]
            // });

            Backbone.Validation.bind(this, {
                invalid: this.invalidForm
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

        photoAdd: function (model, collection, options) {
            this.$thumbsContainer = this.$thumbsContainer ||
                this.$('.photo-thumbs');

            this.$thumbsContainer.append(
                util.template(JST['app/scripts/templates/photo-thumb.ejs'],
                    model.toJSON())
            );
        },

        photoRemove: function (model, collection, options) {
            this.$('.photo-thumb')
                .eq(options.index)
                .remove();
        },

        renderPhotoUploadInfo: function (uploadCount, uploadPercent) {
            this.$uploadInfoContainer = this.$uploadInfoContainer ||
                this.$('.uploads');
            this.$uploadInfoContainer.html(
                util.template(JST['app/scripts/templates/photo-uploads.ejs'],
                    this.photoUploadInfoModel.toJSON())
            );
        },

        photoThumbRemove: function (e) {
            var photos = this.photoCollection,
                index = $(e.target)
                    .parents('.photo-thumb')
                    .index();

            photos.remove(photos.at(index));
        },

        photoThumbClick: function (e) {
            var photos = this.photoCollection,
                index = $(e.target)
                    .parents('.photo-thumb')
                    .index();

            this.$albumPhotoModal = this.$albumPhotoModal ||
                this.$('#albumPhotoModal');
            this.$albumPhotoModal.find('.modal-content')
                .html(
                    new AlbumPhotoView({ model: photos.at(index) })
                        .render()
                        .el
                );
            this.$albumPhotoModal.modal();
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
                    var cloudinaryData = data.result,
                        cloudinaryId = cloudinaryData.public_id;

                    console.log('cloudinarydone');

                    window['moo' + moo] = arguments;
                    console.log('moo' + moo);
                    moo += 1;

                    self.photoUploadInfoModel.set('uploadCount',
                        self.photoUploadInfoModel.get('uploadCount') - 1);

                    delete cloudinaryData['public_id'];
                    self.photoCollection.add({
                        cloudinary: {
                            id: cloudinaryId,
                            data: cloudinaryData
                        }
                    });

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
