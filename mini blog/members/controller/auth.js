const axios = require("axios");
const jwt = require("jsonwebtoken");
const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");

const secret = process.env.SECRET_KEY;

function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "7d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}

exports.login = async function (req, res, next) {
  try {
    const url = "http://localhost:3000/members";
    const { email, password } = req.body;
    const { data } = await axios.get(url, {
      data: {
        email,
      },
    });
    if (!data.value) {
      return next(new Response(RESPONSE_CODE.FAIL, data.message, null));
    }
    if (data.value[0].password !== password) {
      return next(new Response(RESPONSE_CODE.FAIL, "password err", null));
    }
    const payload = {
      id: data.value[0].id,
      nick: data.value[0].nick,
    };
    const token = await createToken(payload);
    return res.status(200).json(
      new Response(RESPONSE_CODE.SUCCESS, "logged in successfully!", {
        token,
      })
    );
  } catch (err) {
    return next(new Response(RESPONSE_CODE.FAIL, "fail", err));
  }
};
