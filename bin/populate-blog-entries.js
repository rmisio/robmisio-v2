// todo: remove from package.json if not using minimist
// argv = require('minimist')(process.argv.slice(2));

var finder = require('findit')(process.argv[2] || '.'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Blog;

require('../server/app/models/blog.js');
Blog = mongoose.model('Blog');

finder.on('file', function (file, stat) {
    console.log('Processing:', file);
    fs.readFile(file, 'utf8', function (err, data) {
        var JSONstr,
            JSONdata,
            blog;

        if (err) {
            return console.log(err);
        }

        JSONstr = data.match(/^{.*?}/);
        if (JSONstr) {
            JSONdata = JSON.parse(JSONstr);

            if (JSONdata['id']) {
                // its an update
                updateBlogEntry(JSONdata['id'], generateTitle(file),
                    data.substr(JSONstr.length));
            } else {
                // its a create
                blog = createBlogEntry(generateTitle(file),
                    data.substr(JSONstr.length));
                blog && writeIdToFile(file, blog.id);
            }
        } else {
            // its a create
            blog = createBlogEntry(generateTitle(file), data);
            blog && writeIdToFile(file, blog.id);
        }
    });
});

function writeIdToFile (file, id) {
    console.log('smooth');
    var idStr = '{ id: ' + id + ' }';
    fs.writeFile(file, idStr, function (err) {
        if (err) {
            console.log('=== Error adding id header to ', file);
            console.log('=== "' + idStr + '" should be added to the '
                + 'top of the file.');
        }
    })
}

function generateTitle (file) {
    console.log('operandus');
    var fileName = file.substr(file.lastIndexOf('/'));

    return fileName.substr(0, fileName.length - 4)
            .replace('--', '$DASH$')
            .replace('-', ' ')
            .replace('$DASH$', '-');
}

function createBlogEntry (title, content) {
    blog = new Blog({
        title: title,
        content: content.trim()
    });
    console.log('tribunal');

    blog.save(function (err) {
        console.log('cafe con leche');
        if (!err) {
            console.log('=== Created blog ' + blog.slug);
            return blog;
        } else {
            console.log('=== Create failed! ' + err);
        }
    });    
}

function updateBlogEntry (id, title, content) {
    console.log('lassi');
    Blog.findByIdAndUpdate(id, {
            title: title,
            content: content.trim()            
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