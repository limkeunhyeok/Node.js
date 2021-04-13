const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nick: {
    type: String,
    required: true,
  },
});

memberSchema.statics.findAll = function () {
  return this.find({});
};

memberSchema.statics.findOneByEmail = function (email) {
  return this.findOne({ email });
};

memberSchema.statics.create = function (data) {
  const member = new this(data);
  return member.save();
};

memberSchema.statics.deleteAll = function () {
  return this.deleteMany({});
};

memberSchema.statics.deleteByEmail = function (email) {
  return this.deleteOne({ email });
};

module.exports = mongoose.model("Member", memberSchema);
