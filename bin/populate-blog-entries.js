// todo: remove from package.json if not using minimist
// argv = require('minimist')(process.argv.slice(2));

var fs = require('fs'),
    mongoose = require('mongoose'),
    config = require('../server/config/config'),
    outstandingCallbacks = 0,
    finder,
    Blog;

function writeIdToFile (file, id, content) {
    var idStr = '{ "id": "' + id + '" }';

    outstandingCallbacks++;
    fs.writeFile(file, idStr + '\n' + content, function (err) {
        outstandingCallbacks--;
        if (err) {
            console.log('=== Error adding id header to ', file);
            console.log('=== "' + idStr + '" should be added to the '
                + 'top of the file.');
            return;
        }
    })
}

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

function createBlogEntry (file, content) {
    var blog;

    content = content.trim();

    blog = new Blog({
        title: generateTitle(file),
        content: content
    });
    
    outstandingCallbacks++;
    blog.save(function (err) {
        outstandingCallbacks--;

        if (!err) {
            console.log('=== Created blog ' + blog.slug);
            writeIdToFile(file, blog.id, content);
            return blog;
        } else {
            console.log('=== Create failed! ' + err);
        }
    });    
}

function updateBlogEntry (file, id, content) {
    content = content.trim();

    outstandingCallbacks++;
    Blog.findByIdAndUpdate(id, {
            title: generateTitle(file),
            content: content
        }, function(err, blog) {
            outstandingCallbacks--;

            if (!err) {
                if (!blog) {
                    console.log('=== Update Failed! Unable to find blog with ' +
                        'id:', id);
                } else {
                    console.log('=== Updated blog ' + blog.slug);
                    return blog;
                }
            } else {
                if (err.name === 'CastError') {
                    console.log('=== Update Failed! Unable to find blog with ' +
                        'id:', id);
                }

                console.log(err);
            }
    });    
}

function ranFromCommandLine() {
    return !!require.main === module
}

function main(path) {
    finder = require('findit')(path || process.argv[2] || '.');

    // Connect to mongodb
    mongoose.connect(config.db);

    require('../server/app/models/blog');
    Blog = mongoose.model('Blog');

    finder.on('file', function (file, stat) {
        console.log('Processing:', file);
        fs.readFile(file, 'utf8', function (err, data) {
            var JSONstr,
                JSONdata;

            if (err) {
                return console.log(err);
            }

            JSONstr = data.match(/^{.*?}/);
            if (JSONstr) {
                JSONdata = JSON.parse(JSONstr);

                if (JSONdata['id']) {
                    updateBlogEntry(file, JSONdata['id'],
                        data.substr(JSONstr[0].length));
                } else {
                    createBlogEntry(file, data.substr(JSONstr[0].length));
                }
            } else {
                createBlogEntry(file, data);
            }
        });
    }).on('end', function() {
        var interval;

        interval = setInterval(function () {
            if (!outstandingCallbacks) {
                clearInterval(interval);

                mongoose.connection.close(function () {
                    ranFromCommandLine() && process.exit(0);
                });
            }
        }, 500);
    });
}

if (ranFromCommandLine()) {
    main();
}

module.exports = function (path) {
    main(path);
}

