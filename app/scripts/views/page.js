/*global define*/

define([
    'app',
    'jquery',
    'underscore',
    'backbone'
], function (app, $, _, Backbone) {
    'use strict';

    var PageView = Backbone.View.extend({
        initialize: function (options) {
        },

        onAttach: function () {},

        remove: function () {
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });

    return PageView;
});
