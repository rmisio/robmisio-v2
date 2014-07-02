var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog');

exports.index = function (req, res) {
    return Blog.find({}, null, { sort: { createdAt: -1 }},
        function(err, blogs) {
            if (!err) {
                return res.send(blogs);            
            } else {
                return res.send(500, err);
            }
        });
}

exports.show = function (req, res) {
    return Blog.findById(req.params.id, function(err, blog) {
        if (!err) {
            return blog ? res.send(blog) : res.send(404);
        } else {
            if (err.name === 'CastError') {
                return res.send(404);
            }

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