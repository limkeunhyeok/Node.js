const path = require("path");
const logger = require("log4js").getLogger("post");

const Post = require("../models/post");
const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");

exports.findAll = function (req, res) {
  let msg = "";
  Post.findAll()
    .then((results) => {
      msg = "Find all success!";
      logger.debug(msg);
      res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
    })
    .catch((err) => {
      msg = "Failed to find all";
      logger.error(err);
      res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
    });
};

exports.findOneByPostId = function (req, res) {
  let msg = "";
  const postId = path.parse(req.params.postId).base;
  Post.findOneByPostId(postId)
    .then((results) => {
      msg = "Success to find one by post ID!";
      logger.debug(msg);
      res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
    })
    .catch((err) => {
      msg = "Failed to find one by post id";
      logger.error(err);
      res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
    });
};

exports.create = function (req, res) {
  let msg = "";
  const data = req.body;
  Post.create(data)
    .then((results) => {
      msg = "Success to create!";
      logger.debug(msg);
      res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
    })
    .catch((err) => {
      msg = "Failed to create";
      logger.error(err);
      res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
    });
};

exports.updateByPostId = function (req, res) {
  let msg = "";
  const postId = path.parse(req.params.postId).base;
  const data = req.body;
  Post.updateByPostId(postId, data)
    .then((results) => {
      msg = "Success to update by post ID!";
      logger.debug(msg);
      res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
    })
    .catch((err) => {
      msg = "Failed to update by post ID";
      logger.error(err);
      res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
    });
};

exports.deleteAll = function (req, res) {
  let msg = "";
  Post.deleteAll()
    .then((results) => {
      msg = "Success to delete all!";
      logger.debug(msg);
      res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
    })
    .catch((err) => {
      msg = "Failed to delete all";
      logger.error(err);
      res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
    });
};

exports.deleteByPostId = function (req, res) {
  let msg = "";
  const postId = path.parse(req.params.postId).base;
  Post.deleteByPostId(postId)
    .then((results) => {
      msg = "Success to delete by post ID!";
      logger.debug(msg);
      res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
    })
    .catch((err) => {
      msg = "Failed to delete by post ID";
      logger.error(err);
      res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
    });
};
