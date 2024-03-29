
/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var csrf = require('csurf');
var swig = require('swig');
var serveStatic = require('serve-static');

var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
var helpers = require('view-helpers');
var config = require('config');
var pkg = require('../../package.json');

var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport) {

    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512
    }));

    // Here we require the prerender middleware that will handle requests from Search Engine crawlers
    // In prod, we are relying on the PRERENDER_TOKEN env var to be set, whereas locally
    // we will run our own prerender server.
    app.use(require('prerender-node'));

    // Static files middleware
    app.use(serveStatic(config.root +
        (env === 'production' ? '/dist' : '/app')));

    // Use winston on production
    var log;
    if (env !== 'development') {
        log = {
            stream: {
            write: function (message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        log = { format: 'dev' };
    }

    // Don't log during tests
    // Logging middleware
    if (env !== 'test') app.use(morgan(log));

    // Swig templating engine settings
    if (env === 'development' || env === 'test') {
        swig.setDefaults({
            cache: false
        });
    }

    // set views path, template engine and default layout
    app.engine('html', swig.renderFile);
    app.set('views', config.root +
        (env === 'production' ?
            '/server/dist/views' : '/server/app/views'));
    app.set('view engine', 'html');

    // expose package.json to views
    app.use(function (req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    // cookieParser should be above session
    app.use(cookieParser());

    // bodyParser should be above methodOverride
    app.use(bodyParser());
    app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
    }));

    // express/mongo session storage
    app.use(session({
        secret: pkg.name,
        store: new mongoStore({
            url: config.db,
            collection : 'sessions',
            auto_reconnect: true
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    // should be declared after session and flash
    app.use(helpers(pkg.name));

    // adds CSRF support
    // if (process.env.NODE_ENV !== 'test') {
    //     app.use(csrf());

    //     // This could be moved to view-helpers :-)
    //     app.use(function(req, res, next){
    //         res.locals.csrf_token = req.csrfToken();
    //         next();
    //     });
    // }
};
