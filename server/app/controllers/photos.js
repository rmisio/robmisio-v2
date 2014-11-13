var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo');

exports.index = function (req, res) {
    return Photo.find({}, null, { sort: { createdAt: -1 }},
        function(err, photos) {
            if (!err) {
                photos = photos.map(function () {
                    delete photos.albums;
                });

                return res.send(photos);
            } else {
                return res.send(500, err);
            }
        });
}

exports.show = function (req, res) {
    return Photo.findById(req.params.id, function (err, photo) {
            if (!err) {
                return photo ? res.send(photo) : res.send(404);
            } else {
                return res.send(500, err);
            }
        });
}

exports.create = function (req, res) {
    var photo;

    photo = new Photo(req.body);
    photo.save(function(err) {
        if (!err) {
            return res.send(photo);
        } else {
            return res.send(500, err);
        }
    });
}

exports.update = function (req, res) {
    return Photo.findByIdAndUpdate(req.params.id, req.body, function(err, album) {
        if (!err) {
            if (!photo) {
                res.send(404);
            } else {
                res.send(photo);
            }
        } else {
            if (err.name === 'CastError') {
                return res.send(404);
            }

            return res.send(500, err);
        }
    });
}
