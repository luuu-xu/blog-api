const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

// Display a list of all posts on GET.
exports.post_list_get = (req, res, next) => {
  Post.find({})
    .sort({ timestamp: -1 })
    .then((post_list) => res.status(200).json({
      message: 'Post list retrived.',
      post_list,
    }))
    .catch((err) => res.status(502).json({
      error: 'Error retriving post list.',
      err,
    }));
}

// Handle for creating a post on POST.
exports.post_create_post = [
  // Validate and sanitize the fields.
  body('title', 'Title is required.')
    .trim()
    .notEmpty()
    .escape(),
  body('text', 'Text is required.')
    .trim()
    .notEmpty()
    .escape(),
  
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Res send json back.
      res.status(400).json({
        error: 'Input is not valid.',
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    
    // Data is valid, create an Post object with sanitized data.
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
    });
    post.save()
      .then(() => res.status(200).json({
        message: 'Post saved successfully.',
        post: post,
      }))
      .catch((err) => res.status(502).json({
        error: 'Error saving post.',
        err,
      }));
  },
];

// Display a specific post on GET.
exports.post_get = (req, res, next) => {
  Post.findById(req.params.postid)
    .then((found_post) => {
      // Post found.
      res.status(200).json({
        message: 'Post found',
        post: found_post,
      });
    })
    .catch((err) => {
      res.status(502).json({
        error: 'Error retriving single post.',
        err,
      })
    });
}

// Handle for updating a specific post on PUT.
exports.post_update_put = [
  // Validate and sanitize the fields.
  body('title', 'Title is required.')
    .trim()
    .notEmpty()
    .escape(),
  body('text', 'Text is required.')
    .trim()
    .notEmpty()
    .escape(),
  
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Res send json back.
      res.status(400).json({
        error: 'Input is not valid.',
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    
    // Data is valid, create an Post object with sanitized data.
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      _id: req.params.postid,
    });

    Post.findByIdAndUpdate(req.params.postid, post)
      .then(() => {
        // Post found, update it.
        res.status(200).json({
          message: 'Post updated successfully.',
          post: post,
        });
      })
      .catch((err) => {
        res.status(502).json({
          error: 'Error updating post.',
          err,
        });
      });
  },
];

// Handle deleting a specific post on DELETE.
exports.post_delete_delete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.postid)
    .then(() => {
      // Post found, delete it.
      res.status(200).json({
        message: 'Post deleted successfully.',
      });
    })
    .catch((err) => {
      res.status(502).json({
        error: 'Error deleting post.',
        err,
      });
    });
}
