const express = require('express');
const {
  getFeedPosts,
  getUserPosts,
  likePost
} = require('../controllers/posts.js');
const { verifyToken } = require('../middleware/auth.js');
const router = require('./auth.js');


/* read */
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);



/* update */
router.patch("/:id/like",verifyToken,likePost);

export default router;