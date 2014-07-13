define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/about-page.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row">\n    <section class="col-md-4">\n        <p>be happy</p>\n    </section>\n    <section class="col-md-8">\n        <p>be snappy</p>\n    </section>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/app.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header id="header-main">\n    <nav class="clearfix">\n        <a href="#menu" class="button-mobile-menu">Menu</a>\n        <div class="logo">\n            <a href="/">robmisio.com</a>\n        </div>        \n        <ul class="list-unstyled">\n            <li>\n                <a href="/blog">blog</a>\n            </li>\n            <li>\n                <a href="/about">about</a>\n            </li>                \n        </ul>\n    </nav>\n</header>\n<div id="page-container"></div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/blog-entry.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<article>\n    <header>\n        <h1>' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n        <p class="author-time-tagline">\n            By <span>Rob Misiorowski</span>\n            <time datetime="' +
((__t = ( createdAt )) == null ? '' : __t) +
'" pubdate>' +
((__t = ( timeAgo(createdAt) )) == null ? '' : __t) +
'</time>\n        </p>\n    </header>\n    ' +
((__t = ( content )) == null ? '' : __t) +
'\n</article>\n';

}
return __p
};

this["JST"]["app/scripts/templates/blog-list-item.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li class="clearfix">\n    <a href="' +
((__t = ( BLOG_ENTRY_URL_PREFIX )) == null ? '' : __t) +
'' +
((__t = ( url )) == null ? '' : __t) +
'">\n        <h2>' +
((__t = ( title )) == null ? '' : __t) +
'</h2>\n        <time datetime="' +
((__t = ( createdAt )) == null ? '' : __t) +
'">' +
((__t = ( timeAgo(createdAt) )) == null ? '' : __t) +
'</time>\n        <div class="spinner"></div>\n    </a>\n</li>';

}
return __p
};

this["JST"]["app/scripts/templates/blog-page.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\n    <ul class="col-md-4 blog-list list-unstyled">\n        ';

            var context = {};
            for (var i=0; i < collection.length; i++) {
                var context = collection[i];
                context['BLOG_ENTRY_URL_PREFIX'] = BLOG_ENTRY_URL_PREFIX;                 
                print(template('app/scripts/templates/blog-list-item.ejs', context));
            }
        ;
__p += '\n    </ul>\n    <section class="col-md-8 blog-entry"></section>\n</div>';

}
return __p
};

  return this["JST"];

});