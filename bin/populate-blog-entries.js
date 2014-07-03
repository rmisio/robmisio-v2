// todo: remove from package.json if not using minimist
// argv = require('minimist')(process.argv.slice(2));

var finder = require('findit')(process.argv[2] || '.'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    config = require('../server/config/config'),
    Blog;

// Connect to mongodb
var connect = function () {
    mongoose.connect(config.db);
};
connect();

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
                // update blog entry
                updateBlogEntry(file, JSONdata['id'],
                    data.substr(JSONstr[0].length));
            } else {
                // create blog entry
                createBlogEntry(file, data.substr(JSONstr[0].length));
            }
        } else {
            // create blog entry
            console.log('skip');
            createBlogEntry(file, data);
        }
    });
}).on('end', function() {
    // mongoose.connection.close(function () {
    //     process.exit(0);
    // });
});


function writeIdToFile (file, id, content) {
    console.log('smooth');
    var idStr = '{ "id": "' + id + '" }';
    fs.writeFile(file, idStr + '\n' + content, function (err) {
        if (err) {
            console.log('=== Error adding id header to ', file);
            console.log('=== "' + idStr + '" should be added to the '
                + 'top of the file.');
            return;
        }

        console.log('butta bean');
    })
}

function generateTitle (file) {
    console.log('operandus');
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
    console.log('tribunal');
    content = content.trim();

    blog = new Blog({
        title: generateTitle(file),
        content: content
    });
    
    blog.save(function (err) {
        console.log('cafe con leche');
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
    console.log('lassi: ' + content);
    content = content.trim();

    Blog.findByIdAndUpdate(id, {
            title: generateTitle(file),
            content: content
        }, function(err, blog) {
            if (!err) {
                if (!blog) {
                    console.log('=== Update Failed! Unable to find blog with' +
                        'id: ', id);
                } else {
                    console.log('=== Updated blog ' + blog.slug);
                    return blog;
                }
            } else {
                if (err.name === 'CastError') {
                    console.log('=== Update Failed! Unable to find blog with' +
                        'id: ', id);
                }

                console.log(err);
            }
    });    
}