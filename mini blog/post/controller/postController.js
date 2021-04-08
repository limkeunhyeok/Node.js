const Post = require('../models/post');

exports.create = function (req, res, next) {
    const post = new Post(req.body);
    post.save((err) => {
        if (err) {
            return res.status(500).json({code: 1, message: 'fail', value: err});
        }
        return res.status(200).json({code: 0, message: 'success', value: null});
    })
}

exports.read = function (req, res, next) {
    Post.find().exec((err, results) => {
        if (err) {
            return res.status(500).json({code: 1, message: 'fail', value: err});
        }
        return res.status(200).json({code: 0, message: 'success', value: results});
    })   
}

exports.update = function (req, res, next) {
    const {title, body} = req.body;
    Post.findOne({"title": title}).exec((err, results) => {
        if (err) {
            return res.status(500).json({code: 1, message: 'fail', value: err});
        }
        results.title = title;
        results.body = body;
        results.save((err) => {
            if (err) {
                return res.status(500).json({code: 1, message: 'fail', value: err});
            }
            return res.status(500).json({code: 0, message: 'success', value: null});
        })
    });
}

exports.delete = function (req, res, next) {
    const {title, body} = req.body;
    const post = Post.find({"title": title});
    post.deleteOne((err) => {
        if (err) {
            return res.status(500).json({code: 1, message: 'fail', value: err});
        }
        return res.status(200).json({code: 0, message: 'success', value: null});
    })
}