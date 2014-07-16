define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/about-page.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row">\n    <section class="col-md-12 quiz">\n        <figure>\n            <img class="image-1" src="http://i.telegraph.co.uk/multimedia/archive/02033/Ricky-Gervais_2033776c.jpg"\n                alt="some alt text" />\n            <figcaption>A cheeky macaque, Lower Kintaganban River, Borneo. Original by <a href="http://www.flickr.com/photos/rclark/">Richard Clark</a></figcaption>\n        </figure>        \n        <p>\n            I was finding the idea of writing an &quot;about me&quot; narrative a bit\n            awkward and uncomfortable, so I thought a little quiz could be\n            kind of fun!\n        </p>\n        <form action="#">\n            <div class="form-group">\n                <p class="control-label">What was my favorite TV show growing up?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question1" value="option1" />\n                        The Cosby Show\n                    </label>\n                </div>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question1" value="option2"\n                            data-answer="answer" />\n                        Perfect Strangers\n                    </label>\n                </div>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question1" value="option3" />\n                        All In The Family\n                    </label>\n                </div>                \n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question1" value="option4" />\n                        MacGyver\n                    </label>\n                </div>                \n            </div>\n            <div class="form-group">\n                <p class="control-label">What Eastern European city do my parents hail from?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question2"\n                            value="option1" />\n                        Riga, Latvia\n                    </label>\n                </div>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question2" value="option2" />\n                        Bratislava, Slovakia\n                    </label>\n                </div>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question2" value="option3" />\n                        Warsaw, Poland\n                    </label>\n                </div>                \n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question2" value="option4" />\n                        Moscow, Mother Russia\n                    </label>\n                </div>                \n            </div>\n            <div class="form-group">\n                <p class="control-label">If green is green, then what is seen?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question3"\n                            value="option1" />\n                        Leems\n                    </label>\n                </div>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question3" value="option2" />\n                        Jeans, of course!\n                    </label>\n                </div>\n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question3" value="option3" />\n                        Super Duper\n                    </label>\n                </div>                \n                <div class="radio">\n                    <label>\n                        <input type="radio" name="question3" value="option4" />\n                        Trial &amp; Error, y\'all\n                    </label>\n                </div>                \n            </div>\n            <button type="reset" class="btn btn-default">Reset</button>\n            <button type="submit" class="btn btn-default">Submit</button>                  \n        </form>\n    </section>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/app.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header id="header-main">\n    <nav class="clearfix">\n        <a href="#menu" class="button-mobile-menu">Menu</a>\n        <div class="logo">\n            <a href="/">robmisio.com</a>\n        </div>        \n        <ul class="list-unstyled">\n            <li>\n                <a href="/blog">blog</a>\n            </li>\n            <li>\n                <a href="/about">about</a>\n            </li>                \n        </ul>\n    </nav>\n</header>\n<div id="page-container"></div>\n<div id="page-overlay"></div>\n\n';

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