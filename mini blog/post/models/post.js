const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

postSchema.statics.findAll = function () {
  return this.find({});
};

postSchema.statics.findOneByPostId = function (postId) {
  return this.findOne({ _id: postId });
};

postSchema.statics.create = function (data) {
  const post = new this(data);
  return post.save();
};

postSchema.statics.updateByPostId = function (postId, data) {
  return this.findOneAndUpdate({ _id: postId }, data, { new: true });
};

postSchema.statics.deleteAll = function () {
  return this.deleteMany({});
};

postSchema.statics.deleteByPostId = function (postId) {
  return this.deleteOne({ _id: postId });
};

module.exports = mongoose.model("Post", postSchema);
