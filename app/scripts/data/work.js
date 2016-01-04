/*global define*/

define([
    'app',
], function (app) {
    'use strict';

    var work = [
      {
        slug: 'lifeforecast',
        thumb: 'lifeforecast/thumb.jpg',
        title: 'Life Forecast',
        liveUrl: 'https://www.getold.com/life-forecast',
        tags: [
          'responsive',
          'sass',
          'backbone',
          'requirejs',
          'ejs',
          'grunt',
          'jquery',
          'velocity'
        ],
        images: [
          'lifeforecast/flow.jpg'
        ],
        description: '<p>Life Forecast is a tool which allows you to enter your current activities and projects how they will play out as you age. The site is a single-page application which gathers data over a few screens and then displays the results featuring an impressive (and oh so pretty) data visualization.</p>'
      },
      {
        slug: 'twclabs',
        thumb: 'twclabs/thumb.jpg',
        title: 'TWC Labs',
        tags: [
          'responsive',
          'sass',
          'gulp',
          'jquery'
        ],
        images: [
          'twclabs/flow.jpg'
        ],
        description: '<p>TWC Labs is a super sleek and sexy single page site featuring a futuristic "Minority Report"-esque color morphing layout, 3D animating buttons, sliding-in sub-content pages and social media integration. It was really a joy to sink my teeth into this one!</p>'
      },
      {
        slug: 'samsungpromotions',
        thumb: 'samsungpromotions/thumb.jpg',
        title: 'Samsung Promotions',
        liveUrl: 'http://promo.samsungpromotions.com/',
        tags: [
          'responsive',
          'sass',
          'es6',
          'gulp',
          'browserify',
          'jade',
          'jquery'
        ],
        images: [
          'samsungpromotions/flow.jpg'
        ],
        description: '<p>SamsungPromotions.com is a hub where Samsung publicises a plethora of on-going promotions.</p>'
      },
      {
        slug: 'bebloggin',
        thumb: 'bebloggin/thumb.jpg',
        title: 'Be Bloggin',
        liveUrl: 'http://rmisio.github.io/be-bloggin/',
        tags: [
          'prototype',
          'responsive',
          'sass',
          'bootstrap',
          'backbone',
          'requirejs',
          'ejs',
          'grunt',
          'jquery',
          'firebase'
        ],
        images: [
          'bebloggin/home.jpg',
          'bebloggin/blog-entry.jpg'
        ],
        description: '<p>BeBloggin is a prototype I put together to play around with a few technologies, notably FireBase. In addition to the <a href="http://rmisio.github.io/be-bloggin/" target="_blank">live site</a>, please feel free to check out a <a href="https://medium.com/@robmisio/a-medium-esque-blog-feed-using-firebase-backbone-mediumeditor-838f074251da#.9p3rftxl3" target="_blank">blog post</a> I wrote with some opinionated ruminations.</p>'
      },
      {
        slug: 'samsung-code-challenge',
        thumb: 'samsung-code-challenge/thumb.jpg',
        title: 'Samsung Coding Challenge',
        liveUrl: 'http://rmisio.github.io/samscom-code-exercise/',
        tags: [
          'prototype',
          'responsive',
          'sass',
          'grunt',
          'grunt',
          'jquery'
        ],
        images: [
          'samsung-code-challenge/slide1.jpg',
          'samsung-code-challenge/slide2.jpg',
          'samsung-code-challenge/slide3.jpg',
          'samsung-code-challenge/slide4.jpg'
        ],
        description: '<p>As a part of an interview process with a local digital media shop, I was asked to complete a small sample site. I thought it was a fun exercise, so I thought I\'d share the fruits.</p><p>Please Note: On the <a href="http://rmisio.github.io/samscom-code-exercise/" target="_blank">live site</a>, be sure to click the far left arrow.</p>'
      },
      {
        slug: 'yourshot',
        thumb: 'yourshot/thumb.jpg',
        title: 'Your Shot',
        liveUrl: 'http://yourshot.nationalgeographic.com/',
        tags: [
          'stylus',
          'bootstrap',
          'backbone',
          'jquery',
          'coffeescript',
          'python',
          'django',          
          'postgresql',
          'elasticsearch'
        ],
        images: [
          'yourshot/flow.jpg',
          'yourshot/slideshow.jpg'
        ],
        description: '<p>YourShot is a very high volume photo sharing community created by the iconic National Geographic Society. I served as the Lead UI Developer on a small scrum team that built the site from the ground up.</p>'
      }      
    ];

    return work;
});
