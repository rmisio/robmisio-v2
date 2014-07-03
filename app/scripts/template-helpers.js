/*global define*/

define([
    'underscore',
], function (_) {
    'use strict';

    var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ], timeAgo;

    timeAgo =  function (date) {
        // partly following suit with the breakdown used here:
        // http://momentjs.com/docs/#/displaying/fromnow/
        var str = '',
            now = new Date(),
            daysElapsed,
            secElapsed;

        date = typeof date === 'string' ? new Date(date) : date;
        daysElapsed = Math.round(Math.abs(
            (now.getTime() - date) / (24*60*60*1000)
        ));

        // if (daysElapsed >= 548) {
        //     str = Math.round(daysElapsed / 365) + ' years ago';
        // } else if (daysElapsed >= 345) {
        //     str = "a year ago"
        // } else if (daysElapsed >= 45) {
        //     str = Math.floor(daysElapsed) + ' months ago';
        // } else if (daysElapsed >= 25) {
        //     str = 'a month ago';
        // } else {

        if (daysElapsed >= 25) {
            str = MONTHS[date.getMonth()] + ' ' + date.getDate() +
                ', ' + date.getFullYear();
        } else {                
            secElapsed = (new Date() - date) / 1000;

            if (secElapsed >= 36*60*60) {
                str = Math.round(secElapsed / 60 / 60 / 24) + ' days ago';
            } else if (secElapsed >= 22*60*60) {
                str = 'a day ago';
            } else if (secElapsed >= 90*60) {
                str = Math.round(secElapsed / 60 / 60) + ' hours ago';                    
            } else if (secElapsed >= 45*60) {
                str = 'an hour ago';
            } else if (secElapsed >= 90) {
                str = Math.round(secElapsed / 60) + ' minutes ago';
            } else if (secElapsed >= 45) {
                str = 'a minute ago';
            } else {
                str = 'seconds ago';
            }
        }

        return str;
    };

    // todo: *REALLY* need to get into mocha or something!
    var testTimeAgo = function () {
        var now = new Date().getTime();

        console.log('============ testing timeAgo yo! =========');

        console.log('Should print: June 6, 2010');
        console.log('======== ' + timeAgo(new Date('6/6/2010')));

        console.log('Should print: October 12, 1979');
        console.log('======== ' + timeAgo(new Date('10/12/1979')));

        console.log('(25 days) Should print: mm/dd/yyyy');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*60*24*25))));

        console.log('(36 hours) Should print: 2 days ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*60*36))));

        console.log('(48 hours) Should print: 2 days ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*60*48))));        

        console.log('(35 hours) Should print: a day ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*60*35))));        

        console.log('(24.4 days) Should print: 24 days ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*60*24*24.4))));

        console.log('(22 hours) Should print: a day ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*60*22))));

        console.log('(90 minutes) Should print: 2 hours ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*90))));

        console.log('(2 hours) Should print: 2 hours ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*60*2))));

        console.log('(21.99 hours) Should print: 22 hours ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*60*21.99))));

        console.log('(45 minutes) Should print: an hour ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*45))));

        console.log('(89.99 minutes) Should print: an hour ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*89.99))));

        console.log('(90 seconds) Should print: 2 minutes ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*90))));

        console.log('(44.99 minutes) Should print: 45 minutes ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*60*44.99))));

        console.log('(89 seconds) Should print: a minute ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*89))));

        console.log('(45 seconds) Should print: a minute ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*45))));

        console.log('(44 seconds) Should print: seconds ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*44))));

        console.log('(2 seconds) Should print: seconds ago');
        console.log('======== ' + timeAgo(new Date(now - (1000*2))));        
    }
    // testTimeAgo();

    return {
        timeAgo: timeAgo
    }
});