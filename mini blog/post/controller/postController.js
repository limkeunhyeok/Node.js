const Post = require('../models/post');
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');

exports.create = function (req, res, next) {
    const createPost = req.body;
    Post.create(createPost).then((createResult) => {
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Created successfully!', createResult));
    }).catch((err) => {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'Creation failure!', err));
    }) 
}

exports.read = function (req, res, next) {
    Post.find().exec().then((results) => {
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Read successfully!', results));
    }).catch((err) => {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'Read failure', err));
    })
}

exports.update = function (req, res, next) {
    const {title, body} = req.body;
    Post.findOne({"title": title}).exec().then((results) => {
        results.body = body;
        return results.save()
    }).then((updateResults) => {
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Update successfully!', updateResults));
    }).catch((err) => {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'Update failure', err));
    })
}

exports.delete = function (req, res, next) {
    const {title, body} = req.body;
    Post.findOne({title: title}).exec().then((results) => {
        return results.deleteOne();
    }).then((deleteResults) => {
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Delete successfully!', deleteResults));
    }).catch((err) => {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'Delete failure', err));
    })
}