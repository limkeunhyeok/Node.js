const path = require("path");

const Post = require("../models/post");
const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");

exports.findAll = function (req, res) {
  Post.findAll()
    .then((results) => {
      res
        .status(200)
        .json(
          new Response(RESPONSE_CODE.SUCCESS, "Find all success!", results)
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(new Response(RESPONSE_CODE.FAIL, "Failed to find all", err));
    });
};

exports.findOneByPostId = function (req, res) {
  const postId = path.parse(req.params.postId).base;
  Post.findOneByPostId(postId)
    .then((results) => {
      res
        .status(200)
        .json(
          new Response(
            RESPONSE_CODE.SUCCESS,
            "Success to find one by post ID!",
            results
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          new Response(RESPONSE_CODE.FAIL, "Failed to find one by post id", err)
        );
    });
};

exports.create = function (req, res) {
  const data = req.body;
  Post.create(data)
    .then((results) => {
      res
        .status(200)
        .json(
          new Response(RESPONSE_CODE.SUCCESS, "Success to create!", results)
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(new Response(RESPONSE_CODE.FAIL, "Failed to create", err));
    });
};

exports.updateByPostId = function (req, res) {
  const postId = path.parse(req.params.postId).base;
  const data = req.body;
  Post.updateByPostId(postId, data)
    .then((results) => {
      res
        .status(200)
        .json(
          new Response(
            RESPONSE_CODE.SUCCESS,
            "Success to update by post ID!",
            results
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          new Response(RESPONSE_CODE.FAIL, "Failed to update by post ID", err)
        );
    });
};

exports.deleteAll = function (req, res) {
  Post.deleteAll()
    .then((results) => {
      res
        .status(200)
        .json(
          new Response(RESPONSE_CODE.SUCCESS, "Success to delete all!", results)
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(new Response(RESPONSE_CODE.FAIL, "Failed to delete all", err));
    });
};

exports.deleteByPostId = function (req, res) {
  const postId = path.parse(req.params.postId).base;
  Post.deleteByPostId(postId)
    .then((results) => {
      res
        .status(200)
        .json(
          new Response(
            RESPONSE_CODE.SUCCESS,
            "Success to delete by post ID!",
            results
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          new Response(RESPONSE_CODE.FAIL, "Failed to delete by post ID", err)
        );
    });
};
