/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone'
], function (app, $, _, Backbone) {
    'use strict';

    var PageView = Backbone.View.extend({
        cache: false,

        initialize: function (options) {
        },

        detach: function () {
            this.restoreScrollPos = $(document).scrollTop();
            this.$el.detach();
        },

        reAttach: function ($container) {
            $container.empty()
                .append(this.$el);
        },

        onAttach: function (e) {
            $(document).scrollTop(this.restoreScrollPos || 0);
        }
    });

    return PageView;
});
