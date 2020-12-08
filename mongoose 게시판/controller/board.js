const Board = require('../models/board');
const Response = require('../utils/response');

exports.create = function(req, res) {
    let post = new Board(req.body);
    post.save((err) => {
        if (err) {
            return res.status(500).end(JSON.stringify(new Response().code(1).message(err).results({})));
        }
        return res.status(200).end(JSON.stringify(new Response().code(0).message('success').results({})));
    });
};

exports.read = function(req, res) {
    Board.find().sort('-created').exec((err, results) => {
        if (err) {
            return res.status(500).end(JSON.stringify(new Response().code(1).message(err).results({})));
        }
        return res.status(200).end(JSON.stringify(new Response().code(0).message('success').results(results)));
    });
};

exports.update = function(req, res) {
    const writer = req.body.writer;
    const post = req.body.post;
    Board.findOne({'writer': writer}, (err, results) => {
        if (err) {
            return res.status(500).end(JSON.stringify(new Response().code(1).message(err).results({})));
        }
        results.post = post;
        results.save((err) => {
            if (err) {
                return res.status(500).end(JSON.stringify(new Response().code(1).message(err).results({})));
            }
            return res.status(200).end(JSON.stringify(new Response().code(0).message('success').results(results)));
        });
    });
};

exports.delete = function(req, res) {
    const writer = req.query.writer;
    const post = Board.find({'writer': writer});
    post.remove((err) => {
        if (err) {
            return res.status(500).end(JSON.stringify(new Response().code(1).message(err).results({})));
        }
        return res.status(200).end(JSON.stringify(new Response().code(0).message('success').results({})));
    });
};