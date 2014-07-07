define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/app.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>tweedle and do</p>\n<a href="/truth">Can you handle the truth?</a>\n<div id="page-container"></div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/blog-entry.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n<p class="author-time-tagline">\n    By <span>Rob Misiorowski</span>\n    <time datetime="' +
((__t = ( createdAt )) == null ? '' : __t) +
'">' +
((__t = ( timeAgo(createdAt) )) == null ? '' : __t) +
'</time>\n</p>\n<div>' +
((__t = ( content )) == null ? '' : __t) +
'</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/blog-list-item.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li class="clearfix">\n    <h2><a href="#">' +
((__t = ( title )) == null ? '' : __t) +
'</a></h2>\n    <div class="time-bar">\n        <time datetime="' +
((__t = ( createdAt )) == null ? '' : __t) +
'">' +
((__t = ( timeAgo(createdAt) )) == null ? '' : __t) +
'</time>\n        <p>reading now</p>\n    </div>\n    <div class="spinner"></div>\n</li>';

}
return __p
};

this["JST"]["app/scripts/templates/blog-page.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\n    <ul class="col-md-4 blog-list list-unstyled">\n        ';
 for (var i=0; i < collection.length; i++) {
            print(template('app/scripts/templates/blog-list-item.ejs',
                collection[i]));
        } ;
__p += '\n    </ul>\n\n    <section class="col-md-8 blog-entry"></section>\n</div>';

}
return __p
};

  return this["JST"];

});