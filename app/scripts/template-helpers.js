/*global define*/

define([
    'underscore',
], function (_) {
    'use strict';

    var MONTHS = [

    ];

    return {
        timeAgo: function(date) {
            return '10 minutes ago';

            // following suit with the breakdown used here:
            // http://momentjs.com/docs/#/displaying/fromnow/
            // var str = '',
            //     now = new Date(),
            //     daysElapsed,
            //     secElapsed;

            // daysElapsed = Math.round(Math.abs(
            //     (now.getTime() - this.createdAt) / (24*60*60*1000)
            // ));

            // if (daysElapsed >= 548) {
            //     str = Math.round(daysElapsed / 365) + ' years ago';
            // } else if (daysElapsed >= 345) {
            //     str = "a year ago"
            // } else if (daysElapsed >= 45) {
            //     str = Math.floor(daysElapsed) + ' months ago';
            // } else if (daysElapsed >= 25) {
            //     str = 'a months ago';
            // } else {
            //     secElapsed = (new Date() - this.createdAt) / 1000;

            //     if (secElapsed >= ) // 36 hours - 25 days
            // }

            // return str;
        }
    }
});