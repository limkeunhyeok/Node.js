const express = require("express");

const router = express.Router();
const memberManagement = require("../controller/membersController");
const validator = require("../controller/validator");
const MyLogger = require("../controller/logger");
const Auth = require("../controller/auth");

const logger = new MyLogger("members");

router.all("/*", (req, res, next) => {
  logger.debugging(req, res, next);
});

// 파라미터가 있으면 해당 회원 조회
// 파라미터가 없으면 전체 조회
router.get("/members", validator.email, memberManagement.inquiry);

// 회원 등록
router.post(
  "/members",
  validator.email,
  validator.password,
  memberManagement.register
);

// 회원 삭제
router.delete("/members", validator.email, memberManagement.unregister);

router.post("/login", validator.email, validator.password, Auth.login);

module.exports = router;
