var mongoose = require('mongoose'),
    Blog = mongoose.model('Album');

exports.index = function (req, res) {
    return Album.find({}, null, { sort: { createdAt: -1 }},
        function(err, albums) {
            var albums = [];

            if (!err) {
                for (var i=0; i < albums.length; i++) {
                    albumsToReturn.push({
                        id: blogs[i]['id'],
                        title: blogs[i]['title'],
                        createdAt: blogs[i]['createdAt'],
                        slug: blogs[i]['slug']
                    });
                }

                return res.send(albumsToReturn);
            } else {
                return res.send(500, err);
            }
        });
}

exports.show = function (req, res) {
    return Album.findById(req.params.id, function (err, album) {
            if (!err) {
                return album ? res.send(album) : res.send(404);
            } else {
                return res.send(500, err);
            }
        });
}

exports.create = function (req, res) {
    var album;

    album = new Album(req.body);
    album.save(function(err) {
        if (!err) {
            return res.send(album);
        } else {
            return res.send(500, err);
        }
    });
}

exports.update = function (req, res) {
    return Album.findByIdAndUpdate(req.params.id, req.body, function(err, album) {
        if (!err) {
            if (!album) {
                res.send(404);
            } else {
                res.send(album);
            }
        } else {
            if (err.name === 'CastError') {
                return res.send(404);
            }

            return res.send(500, err);
        }
    });
}
