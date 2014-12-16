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
    'html-sortable'
], function (app, $, _, Backbone, JST, util, BackboneValidation, cloudinary,
        PageView, AlbumPhotoView, AlbumModel, HtmlSortable) {
    'use strict';

    var AlbumFormView = PageView.extend({
        template: JST['app/scripts/templates/album-form.ejs'],

        events: {
            'submit .album-form': 'submit',
            'click .remove-thumb': 'photoThumbRemove',
            'click .photo-thumb': 'photoThumbClick'
        },

        pageClass: 'album-form-page',

        initialize: function (options) {
            this.options = options || {};

             _.bindAll(this, 'invalidForm', 'validForm');

            this.model = this.options.model;
            if (!this.model || (!this.model instanceof AlbumModel)) {
                throw new Error('Please provide a AlbumModel.');
            }

            // flag indicating whether we are creating or updating the album
            this.createMode = !this.model.get('slug');

            this.photoUploadInfoModel = new Backbone.Model({
                uploadCount: 0,
                uploadPercent: 0
            });

            this.listenTo(this.photoUploadInfoModel, 'change',
                this.renderPhotoUploadInfo, this);
            this.listenTo(this.model.get('photos'), 'add', this.photoAdd, this);
            this.listenTo(this.model.get('photos'), 'remove', this.photoRemove, this);

            Backbone.Validation.bind(this, {
                invalid: this.invalidForm,
                valid: this.validForm
            });
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

        validForm: function(view, attr, error, selector) {
            if (attr === 'photos') {
                Backbone.Validation.callbacks.valid.apply(
                    Backbone.Validation.callbacks,
                    [this, 'file', error, selector]
                );
            } else {
                Backbone.Validation.callbacks.valid.apply(
                    Backbone.Validation.callbacks,
                    arguments
                );
            }
        },

        scrollTop: function ($el, duration) {
            $el = $el || this.$('h1');
            $('html, body').animate({
                scrollTop: $el.offset().top - 10
            }, duration || 500);
        },

        submit: function (e) {
            e.preventDefault();

            var saved = false,
                self = this;

            if (this.isUploadInProgress()) {
                alert('Please wait until any uploads have completed.');
                return;
            }

            saved = this.model.save({
                title: this.$('input[name="title"]').val()
            }, {
                success: function () {
                    var msg;

                    self.scrollTop();

                    if (self.createMode) {
                        self.createMode = false;
                        self.$('.status-msg').html('Groovy! Your <a href="/albums/' +
                            self.model.get('slug') + '">album</a> is now available ' +
                            'for your viewing pleasure.');
                    } else {
                        self.$('.status-msg').html('Groovy! Your <a href="/albums/' +
                            self.model.get('slug') + '">album</a> has been updated.');
                    }
                }
            });

            if (saved === false) {
                this.scrollTop(this.$('.album-form .has-error')
                    .filter(':first'));
            }

        },

        photoAdd: function (model, collection, options) {
            this.$thumbsContainer.append(
                util.template(JST['app/scripts/templates/photo-thumb.ejs'],
                    model.toJSON())
            );

            this.$thumbsContainer.sortable('reload');
            util.deferImage(
                this.$thumbsContainer.find('.photo-thumb')
                    .filter(':last')
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

        isUploadInProgress: function () {
            return !!this.photoUploadInfoModel.get('uploadCount');
        },

        render: function (context) {
            var self = this,
                $fileInput,
                fileInputClasses,
                clOpts = {
                    upload_preset: 'khjyfghg'
                };

            context = _.extend(this.model.toJSON(), context || {});
            this.$el.html(util.template(this.template, context));

            if (app.config.env === 'development') {
                clOpts.tags = ['dev'];
            }

            $fileInput = this.$('.cloudinary_fileupload'),
            fileInputClasses = $fileInput.attr('class');
            $fileInput
                .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, clOpts, {})
                .on('fileuploadsend', function(e, data) {
                    self.photoUploadInfoModel.set('uploadCount',
                        self.photoUploadInfoModel.get('uploadCount') + 1);
                }).on('cloudinarydone', function(e, data) {
                    var cloudinaryData = data.result,
                        cloudinaryId = cloudinaryData.public_id;

                    delete cloudinaryData['public_id'];
                    self.model.get('photos').add({
                        cloudinary: {
                            id: cloudinaryId,
                            data: cloudinaryData
                        }
                    });
                }).on('fileuploadalways', function(e, data) {
                    self.photoUploadInfoModel.set('uploadCount',
                        self.photoUploadInfoModel.get('uploadCount') - 1);
                }).on('cloudinaryprogressall', function(e, data) {
                    self.photoUploadInfoModel.set('uploadPercent',
                        Math.round((data.loaded * 100.0) / data.total));
                })
                // restore classes plugin seems to be blowing away
                .addClass(fileInputClasses);

            this.$('.defer-image').each(function () {
                util.deferImage(this);
            });

            this.$thumbsContainer = this.$('.photo-thumbs').sortable({
                forcePlaceholderSize: true
            }).on('sortupdate', function (e, ui) {
                var photos = self.model.get('photos');

                photos.add(
                    photos.remove(photos.at(ui.oldindex), { silent: true }),
                    {
                        at: ui.item.index(),
                        silent: true
                    }
                );
            });

            return this;
        }
    });

    return AlbumFormView;
});
