/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'views/album'
], function (app, $, _, Backbone, AlbumView) {
    'use strict';

    var BasePhotoBlogView = Backbone.View.extend({
        render: function () {
            var self = this,
                $albumContainers = this.$('.album-container');

            _.each(this.albums, function (album, i) {
                var $container,
                    albumView;

                if (($container = $albumContainers.eq(i)).length) {
                    album.fetch({
                        success: function () {
                            albumView = new AlbumView({
                                model: album
                            });

                            $container.html(albumView.render().el);
                            albumView.onAttach();
                        }
                    })
                }
            });
        }
    });

    return BasePhotoBlogView;
});
