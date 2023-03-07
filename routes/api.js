var express = require('express');
var router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

// ------------------- POST ---------------------------

// GET request for a list of all posts.
router.get('/posts', post_controller.post_list_get);

// POST request for creating a new post.
router.post('/posts', post_controller.post_create_post);

// GET request for a specific post with postid.
router.get('/posts/:postid', post_controller.post_get);

// PUT request for updating a specific post with postid.
router.put('/posts/:postid', post_controller.post_update_put);

// DELETE request for deleting a specific post with postid.
router.delete('/posts/:postid', post_controller.post_delete_delete);

// --------------------- COMMENT ------------------------

// GET request for a list of all comments under one specific post.
router.get('/posts/:postid/comments', comment_controller.comment_list_get);

// POST request for craeting a new comment under one specific post.
router.post('/posts/:postid/comments', comment_controller.comment_create_post);

// GET request for a specific comment with commentid under a specific post with postid.
router.get('/posts/:postid/comments/:commentid', comment_controller.comment_get);

// PUT request for updating a specific comment under a specific post.
router.put('/posts/:postid/comments/:commentid', comment_controller.comment_update_put);

// DELETE request for deleting a specific comment under a specific post.
router.delete('/posts/:postid/comments/:commentid', comment_controller.comment_delete_delete);

module.exports = router;