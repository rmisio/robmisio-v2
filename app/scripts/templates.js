define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/about-page.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row">\n    <section class="col-md-8 quiz">\n        <p>\n            I was finding the prospect of writing an &quot;about me&quot; narrative a bit\n            awkward and dull, so I thought a little quiz could be kind of fun!\n        </p>\n        <div id="quiz-results-container">\n            <p class="error-msg main-error">\n                <span class="glyphicon glyphicon-warning-sign"></span>\n                There are one or more errors. Please fix the fields in red.\n            </p>\n            <p class="quiz-results"></p>\n        </div>\n        <form action="#">\n            <div class="form-group">\n                <p class="control-label">What was my favorite TV show growing up?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q1_option1" type="radio" name="question1" value="option1" />\n                    <label for="q1_option1">\n                        Three\'s Company\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q1_option2" type="radio" name="question1" value="option2"\n                        data-answer="answer" />\n                    <label for="q1_option2">\n                        Perfect Strangers\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>\n                    </label>\n                    <p class="answer-explain">\n                        I watched and really liked all these shows. With characters like\n                        Balki Bartokomous, Archie Bunker and Jack Tripper, how can you go\n                        wrong? If I absolutely must choose one show, it would have to be\n                        this one, but by a infinitesimal margin.\n                    </p>\n                </div>\n                <div class="radio">\n                    <input id="q1_option3" type="radio" name="question1" value="option3" />\n                    <label for="q1_option3">\n                        All In The Family\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q1_option4" type="radio" name="question1" value="option4" />\n                    <label for="q1_option4">\n                        MacGyver\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">What Eastern European city do my parents hail from?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q2_option1" type="radio" name="question2" value="option1" />\n                    <label for="q2_option1">\n                        Riga, Latvia\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q2_option2" type="radio" name="question2" value="option2" />\n                    <label for="q2_option2">\n                        Bratislava, Slovakia\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q2_option3" type="radio" name="question2" value="option3"\n                        data-answer="answer" />\n                    <label for="q2_option3">\n                        Warsaw, Poland\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                    <p class="answer-explain">\n                        My mother came to the US with her family when she was a child. Visiting\n                        Poland many years later she met my father at a wedding. A romance ensued\n                        and after the two were married, they settled back in the US. I was to come\n                        along soon after.\n                    </p>                    \n                </div>                \n                <div class="radio">\n                    <input id="q2_option4" type="radio" name="question2" value="option4" />\n                    <label for="q2_option4">\n                        Moscow, Mother Russia\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">What offense was I was suspended for in high school?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q3_option1" type="radio" name="question3"\n                        value="option1" />\n                    <label for="q3_option1">\n                        Calling my math teacher a &quot;bald asshole&quot;\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q3_option2" type="radio" name="question3" value="option2"\n                        data-answer="answer" />\n                    <label for="q3_option2">\n                        Somewhat accidentally executing a somewhat maliscious computer\n                        program in the computer lab\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                    <p class="answer-explain">\n                        Ah, a true computer nerd! Yes, I was tinkering around and wrote a program\n                        that alternatingly output a really long horizontal bar and an empty line.\n                        I made a really long loop to output many, many lines of this. Then, I found\n                        myself a bit curious as to how this would look printed.\n                    </p>\n                    <p class="answer-explain">\n                        To make a long story medium length, I meant to print only one page,\n                        but the print job seemed not to be going through, so I retried many times.\n                        It wasn\'t until I was called into the dean\'s office the next morning\n                        that I realized the print jobs actually <em>all</em> went through, albeit\n                        after a long delay. So, in addition to having to reimburse the school for\n                        paper and ink, I got to spend a day of in-school suspension in some stuffy\n                        basement classroom. Too bad they didn\'t let me spend it in the computer lab!\n                    </p>                    \n                </div>\n                <div class="radio">\n                    <input id="q3_option3" type="radio" name="question3" value="option3" />\n                    <label for="q3_option3">\n                        Engaging in fistacuffs with a fellow student.\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>\n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q3_option4" type="radio" name="question3" value="option4" />\n                    <label for="q3_option4">\n                        Are you loco in your coco, I wouldn\'t be suspended!\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">What European city did I study abroad in?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q4_option1" type="radio" name="question4" value="option1"\n                        data-answer="answer" />\n                    <label for="q4_option1">\n                        Salamanca, Spain\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                    <p class="answer-explain">\n                        In 2001, I spent a trimester studying the Spanish language in this beautiful city. The university was\n                        founded in 1218 and has some really amazing golden sandstone architecure containing\n                        intricataly detailed carvings. The city also has one of the most incredible main squares\n                        I\'ve ever seen. Factor all that in with the young energy of a university town, the laid back\n                        &mdash; fiesta culture of spain, the intellectual stimulation of learning a new language\n                        and culture and you\'re left with me having a really memorable adventure.\n                    </p>                                        \n                </div>\n                <div class="radio">\n                    <input id="q4_option2" type="radio" name="question4" value="option2" />\n                    <label for="q4_option2">\n                        Krakow, Poland\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q4_option3" type="radio" name="question4" value="option3" />\n                    <label for="q4_option3">\n                        Porto, Portugal\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q4_option4" type="radio" name="question4" value="option4" />\n                    <label for="q4_option4">\n                        Florence, Italy\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">What was the first CD I ever bought?</p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q5_option1" type="radio" name="question5" value="option1" />\n                    <label for="q5_option1">\n                        Ten &mdash; Pearl Jam\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q5_option2" type="radio" name="question5" value="option2" />\n                    <label for="q5_option2">\n                        Cherry Pie &mdash; Warrant\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q5_option3" type="radio" name="question5" value="option3" />\n                    <label for="q5_option3">\n                        Please Hammer, Don\'t Hurt \'Em &mdash; MC Hammer\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q5_option4" type="radio" name="question5" value="option4"\n                        data-answer="answer" />\n                    <label for="q5_option4">\n                        Nevermind &mdash; Nirvanna\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                    <p class="answer-explain">\n                        In 1993, my freshman year of high school, this was the first CD I ever bought.\n                        So, as the <em>compact disc</em> unofficially signaled an end to the <em>cassette</em> era,\n                        my first one was the album that unofficially signaled the end of the hair band era. Wow... I\'ll\n                        give you a moment to let the tremendous profundity of that sink in.\n                    </p>                    \n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">\n                    Recently, my wife and I spent several months travelling abroad. What countries\n                    did we visit?\n                </p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q6_option1" type="radio" name="question6" value="option1" />\n                    <label for="q6_option1">\n                        Brazil, Argentina and Chile\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q6_option2" type="radio" name="question6" value="option2" />\n                    <label for="q6_option2">\n                        Poland, Spain and Portugal\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q6_option3" type="radio" name="question6" value="option3" />\n                    <label for="q6_option3">\n                        Australia and New Zealand\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q6_option4" type="radio" name="question6" value="option4"\n                        data-answer="answer" />\n                    <label for="q6_option4">\n                        Poland, India and Nepal\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                    <p class="answer-explain">\n                        Yes, it was quite the adventure. After a month in Poland, we spent five months\n                        exploring different parts of India. After that we spent a couple of months up in\n                        Nepal. This little area seems much too small for me to go into any kind of\n                        significant detail of our fascinating journey. Who knows, maybe I\'ll be inspired to\n                        make a blog post or few about it...\n                    </p>                    \n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">\n                    What was the first programming language I ever learned?\n                </p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q7_option1" type="radio" name="question7" value="option1"\n                        data-answer="answer" />\n                    <label for="q7_option1">\n                        Basic\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                    <p class="answer-explain">\n                        You got it &mdash; freshman year Computer Science with Mr. Williamson. It wasn\'t\n                        until Junior and Senior year Computer Science that we used Pascal. It wasn\'t\n                        until college that I got into Javascript and Java.\n                    </p>                                        \n                </div>\n                <div class="radio">\n                    <input id="q7_option2" type="radio" name="question7" value="option2" />\n                    <label for="q7_option2">\n                        Pascal\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q7_option3" type="radio" name="question7" value="option3" />\n                    <label for="q7_option3">\n                        Javascript\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q7_option4" type="radio" name="question7" value="option4" />\n                    <label for="q7_option4">\n                        Java\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>\n\n            <div class="form-group">\n                <p class="control-label">\n                    What Indian dish did I eat a whole lot of while developing this site?\n                </p>\n                <p class="error-msg error-required">This field is required. Please select a value.</p>\n                <div class="radio">\n                    <input id="q8_option1" type="radio" name="question8" value="option1"\n                        data-answer="answer" />\n                    <label for="q8_option1">\n                        Kitchari\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                    <p class="answer-explain">\n                        Mmm &mdash; a tasty, healthy, relatively easy to make one pot meal, light enough to keep\n                        the ole noggin thinking clearly, substantial enough to sustain me for a few hours, this was\n                        my lunch on most days (a Chipotle burrito covered most of the other ones). I used\n                        this <a href="http://www.banyanbotanicals.com/ayurveda/kitch-ghee.html" target="_blank">recipe</a>\n                        (the Basic Kitchari one), often adding in some broccoli and okra.\n                    </p>                                        \n                </div>\n                <div class="radio">\n                    <input id="q8_option2" type="radio" name="question8" value="option2" />\n                    <label for="q8_option2">\n                        Dal and Roti\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>\n                <div class="radio">\n                    <input id="q8_option3" type="radio" name="question8" value="option3" />\n                    <label for="q8_option3">\n                        Bhindi masala\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n                <div class="radio">\n                    <input id="q8_option4" type="radio" name="question8" value="option4" />\n                    <label for="q8_option4">\n                        Saag Paneer\n                        <span class="glyphicon glyphicon-ok"></span>\n                        <span class="glyphicon glyphicon-remove"></span>                        \n                    </label>\n                </div>                \n            </div>            \n\n            <button type="reset" class="btn btn-default">Try Again</button>\n            <button type="submit" class="btn btn-default">Submit</button>                  \n        </form>\n    </section>\n\n    <section class="col-md-4 photos">\n        <figure>\n            <img class="img-responsive" src="/images/about-me-holi.JPG"\n                alt="Andaman Islands during Holi festival" />\n            <figcaption>\n                I had the good fortune of being on the\n                <a href="http://en.wikipedia.org/wiki/Andaman_Islands" target="_blank">Andaman Islands</a> during\n                <a href="http://en.wikipedia.org/wiki/Holi" target="_blank">Holi</a>,\n                the ancient Hindu festival of color. As you mosey on down the street\n                you get doused with various colored powders and liquids.\n            </figcaption>\n        </figure>\n\n        <figure>\n            <img class="img-responsive" src="/images/about-me-trekking.JPG"\n                alt="Trekking in Nepal" />\n            <figcaption>\n                Trekking in Nepal &mdash; In many places along the way, I could\n                have sworn I had stumbled through some type of time travel\n                portal, leaving me a few centuries in the past.\n            </figcaption>\n        </figure>\n\n        <figure>\n            <img class="img-responsive" src="/images/about-me-thangka.JPG"\n                alt="Thangka painting lessons" />\n            <figcaption>\n                Another highlight of my time in Nepal,was taking\n                <a href="http://en.wikipedia.org/wiki/Thangka" target="_blank">Thangka</a>\n                painting lessons.\n<!--                 I offer my deepest gratitude to my teacher\n                <button id="thanksManoj" data-toggle="modal" data-target="#thanksManojModal"\n                    class="btn-link">Manoj</button>. -->\n            </figcaption>\n        </figure>        \n    </section>\n\n    <div class="modal fade" id="thanksManojModal">\n        <div class="modal-dialog">\n            <div class="modal-content">\n                <div class="modal-body">\n                    <img class="img-responsive border-frame" src="/images/manoj.JPG" alt="Manoj - Mental Paradise Thangka Art Workshop" />\n                    <p>\n                        <em>Mental Paradise Thangka Art Workshop</em><br />\n                        Pokhara, Lakeside, Khahare-6, Nepal<br />\n                        Pro. Manoj Lama<br />\n                        98460-45137, 98191-35569<br />\n                        manoj46@hotmail.com\n                    </p>\n                </div>\n            </div>\n        </div>\n    </div>    \n</div>';

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

this["JST"]["app/scripts/templates/quiz-results.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p +=
((__t = ( message )) == null ? '' : __t) +
'\n<br />\n<a href="#" class="try-again" data-bypass>try again</a>\n<a href="#" class="show-correct">\n    ';
 print(correctOn ? 'hide' : 'show') ;
__p += ' correct\n</a>';

}
return __p
};

  return this["JST"];

});