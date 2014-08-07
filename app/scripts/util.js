/*global define*/

define([
    'app',
    'underscore',
    'templates',
    'template-helpers'
], function (app, _, JST, templateHelpers) {
    'use strict';

    var resizeTimeout,
        curMQs = {},
        util = {
            template: function(template, context) {
                template = typeof template === 'string' ?
                    JST[template] : template;
                context = context || {};
                return template(_.extend(context, templateHelpers));
            },

            mq: {
                // also used by initMqChangeEvents below
                // all in here should be functions returning a boolean
                maxPhoneLandscape: function() {
                    return Modernizr.mq('only screen and (max-width : 768px)');
                }
            },

            initMqChangeEvents: function (eventEmitter) {
                var checkMQ;

                for (var mqCheck in util.mq) {
                    curMQs[mqCheck] = util.mq[mqCheck]();
                }

                $(window).resize(function(e) {
                    resizeTimeout && clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(function() {
                        var result,
                            on = [],
                            off = [];

                        for (var mqCheck in util.mq) {
                            result = util.mq[mqCheck]();
                            if (curMQs[mqCheck] !== result) {
                                result ? on.push(mqCheck) :
                                    off.push(mqCheck)
                            }

                            if (on.length || off.length) {
                                eventEmitter.trigger(app.e.MQ_CHANGE,
                                    on, off);
                            }

                            curMQs[mqCheck] = result;
                        }        
                    }, 0);
                });
            },

            deferImage: function (element) {
                var $el = $(element),
                    img = new Image(),
                    $placeholder = $el.find(':first-child');

                $el.addClass('loading');
                img.onload = function () {
                    $el.toggleClass('loading loaded');
                    $placeholder.replaceWith(img);
                }

                for (var i = 0; i < $placeholder[0].attributes.length; i++) {
                    var attr = $placeholder[0].attributes[i];
                    
                    if (attr.name.match(/^data-/)) {
                        img.setAttribute(attr.name.replace('data-', ''), attr.value);
                    }                    
                }
            }
        };

    templateHelpers.template = util.template;
    return util;
});