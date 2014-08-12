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
        }
    });

    return PageView;
});
