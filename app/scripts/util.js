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

            deferImage: function (element, options) {
                var $el = $(element),
                    img = new Image(),
                    $placeholder = $el.find(':first-child'),
                    maxHeightRatio = 0.7,
                    elWidth;

                options = options || {};
                $el.addClass('loading');

                if (options.maxHeight && elWidth) {
                    $placeholder.css('max-height', elWidth * maxHeightRatio);
                }

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
            },

            responsivePhoto: function (el, options) {
                var $el = $(el),
                    maxHeightRatio = 0.7,
                    maxHeight,
                    $parent,
                    maxHeightStr;

                options = options || {};
                options.maxHeight = typeof options.maxHeight === 'undefined'
                    ? true : options.maxHeight;

                if (options.maxHeight && ($parent = $el.parent()).width()) {
                    maxHeight = $parent.width() * maxHeightRatio;
                    $el.css('max-height', maxHeight);

                    $(window).resize(
                        _.debounce(function () {
                            console.log('resize');
                            window.resize = $el;

                            if (!$el.length) {
                                console.log('where you at boo?');
                            }

                            maxHeight = $parent.width() * maxHeightRatio;
                            $el.css('max-height', maxHeight);
                            if (maxHeightStr) {
                                maxHeightStr = $el.attr('data-style') || '' + ';max-height: '
                                    + maxHeight + 'px';
                                $el.attr('data-style', maxHeightStr.replace(/^;/, ''));
                            }
                        }, 100)
                    );

                    if ($parent.hasClass('defer-image')) {
                        maxHeightStr = $el.attr('data-style') || '' + ';max-height: '
                            + maxHeight + 'px';
                        $el.attr('data-style', maxHeightStr.replace(/^;/, ''));
                    }
                }

                if ($parent.hasClass('defer-image')) {
                    util.deferImage($parent);
                }
            },

            deviceWidth: function () {
                var deviceWidth = window.screen.width;

                // iOS returns available pixels, Android returns pixels / pixel ratio
                // http://www.quirksmode.org/blog/archives/2012/07/more_about_devi.html
                if (navigator.userAgent.indexOf('Android') >= 0 && window.devicePixelRatio) {
                    deviceWidth = deviceWidth / window.devicePixelRatio;
                }

                return deviceWidth;
            }
        };

    templateHelpers.template = util.template;
    templateHelpers.deviceWidth = util.deviceWidth;
    return util;
});
