const Post = require("../models/post");
const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");

exports.create = function (req, res) {
  const createPost = req.body;
  Post.create(createPost)
    .then((createResult) =>
      res
        .status(200)
        .json(
          new Response(
            RESPONSE_CODE.SUCCESS,
            "Created successfully!",
            createResult
          )
        )
    )
    .catch((err) =>
      res
        .status(500)
        .json(new Response(RESPONSE_CODE.FAIL, "Creation failure!", err))
    );
};

exports.read = function (req, res) {
  Post.find()
    .exec()
    .then((results) =>
      res
        .status(200)
        .json(
          new Response(RESPONSE_CODE.SUCCESS, "Read successfully!", results)
        )
    )
    .catch((err) =>
      res
        .status(500)
        .json(new Response(RESPONSE_CODE.FAIL, "Read failure", err))
    );
};

exports.update = function (req, res) {
  const { title, body } = req.body;
  Post.findOne({ title })
    .exec()
    .then((results) => {
      const updatePost = results;
      updatePost.body = body;
      return updatePost.save();
    })
    .then((updateResults) =>
      res
        .status(200)
        .json(
          new Response(
            RESPONSE_CODE.SUCCESS,
            "Update successfully!",
            updateResults
          )
        )
    )
    .catch((err) =>
      res
        .status(500)
        .json(new Response(RESPONSE_CODE.FAIL, "Update failure", err))
    );
};

exports.delete = function (req, res) {
  const { title } = req.body;
  Post.findOne({ title })
    .exec()
    .then((results) => results.deleteOne())
    .then((deleteResults) =>
      res
        .status(200)
        .json(
          new Response(
            RESPONSE_CODE.SUCCESS,
            "Delete successfully!",
            deleteResults
          )
        )
    )
    .catch((err) =>
      res
        .status(500)
        .json(new Response(RESPONSE_CODE.FAIL, "Delete failure", err))
    );
};
