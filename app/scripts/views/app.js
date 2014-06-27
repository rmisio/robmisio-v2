/*global define*/

console.log('are');
define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AppView = Backbone.View.extend({
        template: JST['app/scripts/templates/app.ejs'],

        id: 'main-container',

        events: {},

        initialize: function () {
            console.log('spice');
            this.render();
        },

        render: function () {
            // this.$el.html(this.template());

            return this;
        }
    });

    return AppView;
});
console.log('you?');