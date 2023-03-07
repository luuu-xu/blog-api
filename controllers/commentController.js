const Post = require('../models/post');
const Comment = require('../models/comment');

// Display a list of comments under one specific post.
exports.comment_list_get = (req, res) => {
  res.send('commetn list get working...' + req.params.postid);
}

// Handle for creating a comment under one specific post.
exports.comment_create_post = (req, res) => {
  res.send('comment create post working...' + req.params.postid);
}

// Display a specific comment under a specific post.
exports.comment_get = (req, res) => {
  res.send('comment get working...' + req.params.postid + req.params.commentid);
}

// Handle for updating a comment under a post.
exports.comment_update_put = (req, res) => {
  res.send('comment update put working...' + req.params.commentid);
}

// Handle for deleting a comment under a post.
exports.comment_delete_delete = (req, res) => {
  res.send('comment delete delete working...' + req.params.commentid);
}