define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/about-page.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row">\n    <section class="col-md-12 quiz">\n        <figure>\n            <img class="image-1" src="http://i.telegraph.co.uk/multimedia/archive/02033/Ricky-Gervais_2033776c.jpg"\n                alt="some alt text" />\n            <figcaption>A cheeky macaque, Lower Kintaganban River, Borneo. Original by <a href="http://www.flickr.com/photos/rclark/">Richard Clark</a></figcaption>\n        </figure>        \n        <p>\n            I was finding the prospect of writing an &quot;about me&quot; narrative a bit\n            awkward and dull, so I thought a little quiz could be kind of fun!\n        </p>\n        <div id="quiz-results-container">\n            <p class="error-msg main-error">\n                <span class="glyphicon glyphicon-warning-sign"></span>\n                There are one or more errors. Please fix the fields in red.\n            </p>\n            <p class="quiz-results">\n                <br />\n                <a href="#" class="try-again">try again</a>\n                <a href="#" class="show-correct">show correct</a>\n            </p>\n        </div>\n        <form action="#">\n            <div class="form-group">\n                <p class="control-label">What was my favorite TV show growing up?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q1_option1" type="radio" name="question1" value="option1" />\n                    <label for="q1_option1">\n                        The Cosby Show\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q1_option2" type="radio" name="question1" value="option2"\n                        data-answer="answer" />\n                    <label for="q1_option2">\n                        Perfect Strangers\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>\n                    </label>\n                    <p class="answer-explain">\n                        Yes. I liked it. I like it a lot. Let\'s put some more placeholder\n                        text in here in the form of useless convoluted banter, blah blah,\n                        blah blah.\n                    </p>\n                </div>\n                <div class="radio">\n                    <input id="q1_option3" type="radio" name="question1" value="option3" />\n                    <label for="q1_option3">\n                        All In The Family\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q1_option4" type="radio" name="question1" value="option4" />\n                    <label for="q1_option4">\n                        MacGyver\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">What Eastern European city do my parents hail from?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q2_option1" type="radio" name="question2" value="option1" />\n                    <label for="q2_option1">\n                        Riga, Latvia\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q2_option2" type="radio" name="question2" value="option2" />\n                    <label for="q2_option2">\n                        Bratislava, Slovakia\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q2_option3" type="radio" name="question2" value="option3"\n                        data-answer="answer" />\n                    <label for="q2_option3">\n                        Warsaw, Poland\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                    <p class="answer-explain">\n                        It was super groovy!\n                    </p>                    \n                </div>                \n                <div class="radio">\n                    <input id="q2_option4" type="radio" name="question2" value="option4" />\n                    <label for="q2_option4">\n                        Moscow, Mother Russia\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">If green is green, then what is seen?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q3_option1" type="radio" name="question3"\n                        value="option1" />\n                    <label for="q3_option1">\n                        Leems\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q3_option2" type="radio" name="question3" value="option2" />\n                    <label for="q3_option2">\n                        Jeans, of course!\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q3_option3" type="radio" name="question3" value="option3" />\n                    <label for="q3_option3">\n                        Super Duper\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q3_option4" type="radio" name="question3" value="option4"\n                        data-answer="answer" />\n                    <label for="q3_option4">\n                        Trial &amp; Error, y\'all\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>\n\n            <button type="reset" class="btn btn-default">Try Again</button>\n            <button type="submit" class="btn btn-default">Submit</button>                  \n        </form>\n    </section>\n</div>';

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