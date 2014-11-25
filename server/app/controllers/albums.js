var async = require('async'),
    mongoose = require('mongoose')
    _ = require('lodash'),
    Album = mongoose.model('Album'),
    Photo = mongoose.model('Photo');

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
    var funcs = [];

    return Album.findOne({ slug: req.params.slug }, function (err, album) {
        if (!err) {
            if (!album) {
                return res.send(404);
            }

            return Photo.find({
                '_id': {
                    $in: album.photos
                }
            }, function (err, photos) {
                var ret;

                if (!err) {
                    ret = JSON.parse(JSON.stringify(album));
                    ret.photos = [];

                    photos.forEach(function (p, i) {
                        ret.photos[album.photos.indexOf(p._id)] = p;
                    });

                    return res.send(ret);
                } else {
                    return res.send(500, err);
                }

            });
        } else {
            return res.send(500, err);
        }
    });
}

exports.create = function (req, res) {
    var saveFuncs = [],
        album;

    req.body.photos.forEach(function (photoOuter, index) {
        var photo;

        if (typeof photoOuter === 'object') {
            photo = new Photo(photoOuter);

            saveFuncs.push(function (callback) {
                photo.save(function (err) {
                    if (!err) {
                        req.body.photos[index] = photo;
                        callback(null, photo);
                    } else {
                        callback(err);
                    }
                });
            });
        }
    });

    return async.parallel(
        saveFuncs,
        function (err, results) {
            if (!err) {
                album = new Album(req.body);
                album.save(function (err) {
                    if (!err) {
                        return res.send(album);
                    } else {
                        return res.send(500, err);
                    }
                });
            } else {
                return res.send(500, err);
            }
        }
    );
}

exports.update = function (req, res) {
    var funcs = [];

    req.body.photos.forEach(function (photoOuter, index) {
        var photo;

        if (typeof photoOuter === 'object') {
            if (photoOuter._id) {
                funcs.push(function (callback) {
                    Photo.findByIdAndUpdate(photoOuter._id, _.omit(photoOuter, '_id'), function(err, photo) {
                        if (!err) {
                            if (!photo) {
                                callback('Unable to find photo with id: ' + photoOuter._id);
                            } else {
                                req.body.photos[index] = photo;
                                callback(null, photo);
                            }
                        } else {
                            callback(err);
                        }
                    });
                });
            } else {
                photo = new Photo(photoOuter);
                funcs.push(function (callback) {
                    photo.save(function (err) {
                        if (!err) {
                            req.body.photos[index] = photo;
                            callback(null, photo);
                        } else {
                            callback(err);
                        }
                    });
                });
            }
        }
    });

    return async.parallel(
        funcs,
        function (err, results) {
            if (!err) {
                Album.findByIdAndUpdate(req.params.id, _.omit(req.body, '_id'), function(err, album) {
                    if (!err) {
                        if (!album) {
                            return res.send(404);
                        } else {
                            return res.send(album);
                        }
                    } else {
                        if (err.name === 'CastError') {
                            return res.send(404);
                        }

                        return res.send(500, err);
                    }
                });
            } else {
                return res.send(500, err);
            }
        }
    );
}
