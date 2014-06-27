define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/app.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>The weasle and the proper one - alert</p>\n<a href="/truth">Can you handle the truth?</a>\n<div id="page-container"></div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/blog-list-item.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li>\n    <h2>' +
((__t = ( title )) == null ? '' : __t) +
'</h2>\n    <time datetime="' +
((__t = ( createdAt )) == null ? '' : __t) +
'">' +
((__t = ( createdAtVerbose )) == null ? '' : __t) +
'</time>\n</li>';

}
return __p
};

this["JST"]["app/scripts/templates/blog-page.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row">\n    <ul class="col-md-4 blog-list">\n    </ul>\n\n    <div class="col-md-8 blog-entry">\n    </div>\n</div>\n\n';

}
return __p
};

  return this["JST"];

});