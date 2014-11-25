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
                    $placeholder = $el.find(':first-child');

                options = options || {};
                $el.addClass('loading');

                img.onload = function () {
                    $el.toggleClass('loading loaded');
                    $placeholder.replaceWith(img);
                    typeof options.onAttach === 'function'
                        && options.onAttach({ img: img });
                }

                for (var i = 0; i < $placeholder[0].attributes.length; i++) {
                    var attr = $placeholder[0].attributes[i];

                    if (attr.name.match(/^data-/)) {
                        img.setAttribute(attr.name.replace('data-', ''), attr.value);
                    }
                }
            },

            // portrait bit of a misnomer here... it's actually photos whose aspect
            // ration is greater than the ratio declared below.
            respPortraitPhoto: function (el) {
                var $el = $(el),
                    ratio = 0.6,
                    $parent = $el.parent(),
                    maxHeight,
                    parentHeight,
                    resize,
                    unbind,
                    parentWidth,
                    adjustedW;

                $parent.css('width', 'auto');
                $el.css('max-height', 'auto');
                if (parentWidth = $parent.width()) {
                    maxHeight = parentWidth * ratio;
                    parentHeight = $parent.data('photo-height');
                    maxHeight = maxHeight > parentHeight ? parentHeight : maxHeight;

                    adjustedW = maxHeight / (parentHeight / $parent.data('photo-width'));
                    if (adjustedW < parentWidth) {
                        $parent.width(adjustedW);
                    }

                    $el.css('max-height', maxHeight);

                    resize = _.debounce(function () {
                        util.respPortraitPhoto(el);
                    }, 100);

                    $(window).one('resize', resize);
                }

                unbind = function () {
                    resize && $(window).off('resize', resize);
                };

                return { unbind: unbind };
            },

            responsivePhoto: function (el, options) {
                var $el = $(el),
                    $img = $el.find(':first-child'),
                    maxHeightRatio = 0.7,
                    rCMH;

                if ($el.hasClass('defer-image')) {
                    rCMH = util.respPortraitPhoto($img);
                    util.deferImage($el, {
                        onAttach: function (e) {
                            rCMH.unbind();
                            util.respPortraitPhoto(e.img);
                        }
                    });
                } else {
                    rCMH = util.respPortraitPhoto($img);
                }

                // todo: second onresize handler (the one on the
                // actual img tag) is not being unbound!
                return { unbind: rCMH.unbind };
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
