define([
    'jquery',
    'underscore',
], function ($, _) {
    'use strict';

    var BLOG_ENTRY_URL_PREFIX = 'posts/',
        e = {
            MQ_CHANGE: 'MQ_CHANGE'
        };

    return {
        e: e,
        BLOG_ENTRY_URL_PREFIX: BLOG_ENTRY_URL_PREFIX,
    }
});
