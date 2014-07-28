
/**
 * Module dependencies.
 */

var path = require('path'),
    mongoose = require('mongoose'),
    home = require('home'),
    blogs = require('blogs'),
    indexUrl;

/**
 * Expose
 */

module.exports = function (app, passport) {
    // blog routes
    app.get('/api/blogs', blogs.index);
    app.get('/api/blogs/:year/:month/:slug', blogs.show);
    // app.post('/api/blogs', blogs.create);
    // app.put('/api/blogs/:id', blogs.update);
    // app.del('/blogs/:id', blogs.destroy);

   // Error handling
    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).render('500', { error: err.stack });
    });

    // route all requests to single page
    indexUrl = process.env.NODE_ENV === 'production' ?
        '../../../dist/index.html' : '../../../app/index.html';
    app.get('*', function (req, res, next) {
        console.log('============--------> boom: ' +
            path.resolve(__dirname + indexUrl));
        res.sendfile(path.resolve(__dirname + indexUrl));
    });

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
};
