const Post = require('../models/post');

// Display a list of all posts on GET.
exports.post_list_get = (req, res) => {
  res.send('post list get working...');
}

// Handle for creating a post on POST.
exports.post_create_post = (req, res) => {
  res.send('post create post working...');
}

// Display a specific post on GET.
exports.post_get = (req, res) => {
  res.send('post get working...' + req.params.postid);
}

// Handle for updating a specific post on PUT.
exports.post_update_put = (req, res) => {
  res.send('post update put working...' + req.params.postid);
}

// Handle deleting a specific post on DELETE.
exports.post_delete_delete = (req, res) => {
  res.send('post delete delete working...' + req.params.postid);
}
