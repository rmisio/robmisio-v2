var fs = require('fs'),
    mongoose = require('mongoose'),
    config = require('../server/config/config'),
    outstandingCallbacks = 0,
    finder,
    Blog,
    done;

// todo: the approach of this script has flaws - major one being
// lack of deletion. Other on being if i change the filename, it
// will create a new blog entry and leave the other on still there.
// also, current implemention requires blog title to be unique --
// probably not a huge deal, but also not ideal.

function generateTitle (file) {
    var lastSlashIndex = file.lastIndexOf('/'),
        fileName = file.substr(lastSlashIndex === -1 ? 0 : lastSlashIndex + 1);

    if (fileName.charAt(fileName.length - 4) === '.') {
        // strip extension
        fileName = fileName.substr(0, fileName.length - 4);
    }

    return fileName.replace(/--/g, '$DASH$')
            .replace(/-/g, ' ')
            .replace(/\$DASH\$/g, '-');
}

function ranFromCommandLine () {
    return require.main === module
}

function main (path, done) {
    done = done;
    finder = require('findit')(path || process.argv[2] || '.');

    // Connect to mongodb
    mongoose.connect(config.db);
    
    require('../server/app/models/blog');
    Blog = mongoose.model('Blog');

    finder.on('file', function (file, stat) {
        console.log('Processing:', file);

        fs.readFile(file, 'utf8', function (err, data) {
            var title = generateTitle(file),
                content = data.trim();

            if (err) {
                return console.log(err);
            }

            outstandingCallbacks++;
            Blog.findOneAndUpdate({ title: title },
                { content: content }, function(err, blog) {
                    var blog;

                    outstandingCallbacks--;

                    if (err) {
                        return console.log(err);
                    }

                    if (blog) {
                        console.log('=== Updated blog ' + blog.slug);
                    } else {
                        blog = new Blog({
                            title: title,
                            content: content
                        });
                        
                        outstandingCallbacks++;
                        blog.save(function (err) {
                            outstandingCallbacks--;

                            if (!err) {
                                console.log('=== Created blog ' + blog.slug);
                            } else {
                                console.log('=== Create failed! ' + err);
                            }
                        });                            
                    }
            });    
        });
    }).on('end', function() {
        var interval;

        interval = setInterval(function () {
            if (!outstandingCallbacks) {
                clearInterval(interval);

                mongoose.connection.close(function () {
                    typeof done === 'function' && done();
                    ranFromCommandLine() && process.exit(0);
                });
            }
        }, 500);
    }).on('error', function(err) {
        console.log(err);
    });
}

if (ranFromCommandLine()) {
    main();
}

module.exports = function (path, done) {
    main(path, done);
}