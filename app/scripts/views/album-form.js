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
    'models/album'
], function (app, $, _, Backbone, JST, util, BackboneValidation, cloudinary,
        PageView, AlbumPhotoView, AlbumModel) {
    'use strict';

    var AlbumFormView = PageView.extend({
        template: JST['app/scripts/templates/album-form.ejs'],

        events: {
            'submit .album-form': 'submit',
            'click .remove-thumb': 'photoThumbRemove',
            'click .photo-thumb': 'photoThumbClick'
        },

        pageClass: 'album-form',

        initialize: function (options) {
            this.options = options || {};

             _.bindAll(this, 'invalidForm');

            this.model = this.options.model;
            if (!this.model || (!this.model instanceof AlbumModel)) {
                throw new Error('Please provide a AlbumModel.');
            }

            this.photoUploadInfoModel = new Backbone.Model({
                uploadCount: 0,
                uploadPercent: 0
            });

            this.listenTo(this.photoUploadInfoModel, 'change',
                this.renderPhotoUploadInfo, this);
            this.listenTo(this.model.get('photos'), 'add', this.photoAdd, this);
            this.listenTo(this.model.get('photos'), 'remove', this.photoRemove, this);

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
                title: this.$('input[name="title"]').val()
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
            var photos = this.model.get('photos'),
                index = $(e.target)
                    .parents('.photo-thumb')
                    .index();

            e.stopPropagation();
            photos.remove(photos.at(index));
        },

        photoThumbClick: function (e) {
            var self = this,
                photos = this.model.get('photos'),
                index = $(e.target)
                    .parents('.photo-thumb')
                    .index(),
                albumPhotoView;

            this.$albumPhotoModal = this.$albumPhotoModal ||
                this.$('#albumPhotoModal');
            this.$albumPhotoModal.find('.modal-content')
                .html(
                    (albumPhotoView = new AlbumPhotoView({ model: photos.at(index) }))
                        .render()
                        .el
                );

            this.listenTo(albumPhotoView, 'model-data-set', function () {
                self.$albumPhotoModal.modal('hide');
            });

            this.$albumPhotoModal.modal();
        },

        render: function () {
            var context = this.model.toJSON(),
                self = this,
                $fileInput,
                fileInputClasses;

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
                    self.model.get('photos').add({
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

    return AlbumFormView;
});
