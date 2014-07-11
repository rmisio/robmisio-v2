/*global define*/

define([
    'app',
    'underscore',
    'templates',
    'template-helpers'
], function (app, _, JST, templateHelpers) {
    'use strict';

    var util = {
        template: function(template, context) {
            template = typeof template === 'string' ?
                JST[template] : template;
            context = context || {};
            return template(_.extend(context, templateHelpers));
        }
    }

    templateHelpers.template = util.template;
    return util;
});