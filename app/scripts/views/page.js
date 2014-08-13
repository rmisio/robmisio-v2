/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone'
], function (app, $, _, Backbone) {
    'use strict';

    var PageView = Backbone.View.extend({
        cache: true,
        
        initialize: function (options) {
        },

        detach: function () {
            this.$el.detach();
        },

        reAttach: function ($container) {
            $container.empty()
                .append(this.$el);
        },

        onAttach: function (e) {

        }
    });

    return PageView;
});
