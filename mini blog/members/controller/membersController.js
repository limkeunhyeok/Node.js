const path = require('path');
const Logger = require('log4js').getLogger('member');

const Member = require('../models/member');
const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");

exports.findAll = function(req, res) {
  let msg = "";
  Member.findAll().then((results) => {
    msg = "Find all success!";
    Logger.debug(msg);
    res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
  }).catch((err) => {
    msg = "Failed to find all";
    Logger.error(msg);
    res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
  });
};

exports.findOneByEmail = function (req, res) {
  const email = path.parse(req.params.email).base;
  let msg = "";
  Member.findOneByEmail(email).then((results) => {
    msg = "Success to find one by email!";
    Logger.debug(msg);
    res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
  }).catch((err) => {
    msg = "Failed to find one by email";
    Logger.error(msg);
    res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
  });
};


exports.create = function (req, res) {
  const data = req.body;
  let msg = "";
  Member.create(data).then((results) => {
    msg = "Success to create!";
    Logger.debug(msg);
    res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
  }).catch((err) => {
    msg = "Failed to create";
    Logger.error(msg);
    res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
  });
};

exports.deleteAll = function (req, res) {
  let msg = "";
  Member.deleteAll().then((results) => {
    msg = "Success to delete all!";
    Logger.debug(msg);
    res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
  }).catch((err) => {
    msg = "Failed to delete all";
    Logger.error(msg);
    res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
  });
};

exports.deleteByEmail = function (req, res) {
  const email = path.parse(req.params.email).base;
  let msg = "";
  Member.deleteByEmail(email).then((results) => {
    msg = "Success to delete by email!";
    Logger.debug(msg);
    res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, msg, results));
  }).catch((err) => {
    msg = "Failed to delete by email";
    Logger.error(msg);
    res.status(500).json(new Response(RESPONSE_CODE.FAIL, msg, err));
  });
};
