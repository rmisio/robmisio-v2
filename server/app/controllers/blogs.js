var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog');

exports.index = function (req, res) {
    return Blog.find({}, null, { sort: { createdAt: -1 }},
        function(err, blogs) {
            var blogsToReturn = [];

            if (!err) {
                for (var i=0; i < blogs.length; i++) {
                    blogsToReturn.push({
                        id: blogs[i]['id'], 
                        title: blogs[i]['title'],
                        createdAt: blogs[i]['createdAt'],
                        url: blogs[i]['url']
                    });
                }

                return res.send(blogsToReturn);
            } else {
                return res.send(500, err);
            }
        });
}

exports.show = function (req, res) {
    var year = req.params.year,
        month = req.params.month,
        slug = req.params.slug,
        startDate = new Date(year, month - 1, 1),
        endDate = new Date(year, month, 1);

    return Blog.findOne({'slug' : slug})
        .where('createdAt')
        .gte(startDate)
        .lt(endDate)
        .exec(function (err, blog) {
            if (!err) {
                return blog ? res.send(blog) : res.send(404);
            } else {
                return res.send(500, err);
            }
        });
}

exports.create = function (req, res) {
    var blog;

    blog = new Blog(req.body);
    blog.save(function(err) {
        if (!err) {
            return res.send(blog);
        } else {
            return res.send(500, err);
        }
    });
}

exports.update = function (req, res) {
    return Blog.findByIdAndUpdate(req.params.id, req.body, function(err, blog) {
        if (!err) {
            if (!blog) {
                res.send(404);
            } else {
                res.send(blog);
            }
        } else {
            if (err.name === 'CastError') {
                return res.send(404);
            }

            return res.send(500, err);
        }
    });
}