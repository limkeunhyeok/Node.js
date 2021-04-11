const express = require("express");

const router = express.Router();
const post = require("../controller/postController");

router.get("/post", post.findAll);
router.get("/post/:postId", post.findOneByPostId);
router.post("/post", post.create);
router.put("/post/:postId", post.updateByPostId);
router.delete("/post", post.deleteAll);
router.delete("/post/:postId", post.deleteByPostId);

module.exports = router;
