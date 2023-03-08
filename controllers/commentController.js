const Post = require('../models/post');
const { Comment } = require('../models/comment');
const { body, validationResult } = require('express-validator');

// Display a list of comments under one specific post.
exports.comment_list_get = (req, res, next) => {
  // Find the post with postid.
  Post.findById(req.params.postid)
    .then((found_post) => {
      // Find the comment list and return the list.
      const comment_list = found_post.comments;
      
      res.status(200).json({
        message: 'Comment list retrived successfully.',
        comment_list: comment_list,
      });
    })
    .catch((err) => {
      res.status(404).json({
        error: 'Post not found.',
        err,
      });
    });
}

// Handle for creating a comment under one specific post.
exports.comment_create_post = [
  // Validate and sanitize data fields.
  body('text', 'Text is required.')
    .trim()
    .notEmpty()
    .escape(),
  body('name', 'Name is required.')
    .trim()
    .notEmpty()
    .escape(),
  
  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract errors from req.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors, send back the sanitized data.
      res.status(400).json({
        error: 'Input is not valid.',
        data: req.body,
        errors: errors.array(),
      });
      return;
    }

    // Data is valid, create Comment object with sanitized data.
    const comment = new Comment({
      text: req.body.text,
      name: req.body.name,
    });

    // Find the post with postid.
    const post = await Post.findById(req.params.postid)
      .catch((err) => {
        // Post with postid not found.
        res.status(404).json({
          error: 'Post not found.', 
          err
        });
      });
    
    post.comments.push(comment);

    // Save the comment to the post.
    await post.save()
      .then(() => {
        res.status(200).json({
          message: 'Comment added to post.',
        });
      })
      .catch((err) => {
        res.status(502).json({
          error: 'Error saving comment to post.',
          err,
        });
      });
  },
];

// Display a specific comment under a specific post.
exports.comment_get = (req, res, next) => {
  // Find the post with postid.
  Post.findById(req.params.postid)
    .then((found_post) => {
      // Find the comment with commentid.
      const comment = found_post.comments.id(req.params.commentid);

      if (comment == null) {
        // Comment is not found.
        res.status(404).json({
          error: 'Comment not found.',
        });
      } else {
        // Comment found, res send back comment data.
        res.status(200).json({
          message: 'Comment retrived successfully.',
          comment: comment,
        });  
      }
    })
    .catch((err) => {
      res.status(404).json({
        error: 'Post not found.',
        err,
      });
    });
}

// Handle for updating a comment under a post.
exports.comment_update_put = [
  // Validate and sanitize data fields.
  body('text', 'Text is required.')
    .trim()
    .notEmpty()
    .escape(),
  body('name', 'Name is required.')
    .trim()
    .notEmpty()
    .escape(),
  
  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract errors from req.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors, send back the sanitized data.
      res.status(400).json({
        error: 'Input is not valid.',
        data: req.body,
        errors: errors.array(),
      });
      return;
    }

    // Find the post with postid.
    const post = await Post.findById(req.params.postid)
      .catch((err) => {
        // Post with postid not found.
        res.status(404).json({
          error: 'Post not found.', 
          err
        });
      });
    
    const found_comment = post.comments.id(req.params.commentid);

    if (found_comment == null) {
      // Comment with commentid not found.
      res.status(404).json({
        error: 'Comment not found.',
      });
      return;
    } else {
      // Comment found, update the record.
      found_comment.title = req.body.title;
      found_comment.text = req.body.text;

      await post.save()
      .then(() => {
        res.status(200).json({
          message: 'Comment updated.'
        })
      })
      .catch((err) => {
        res.status(502).json({
          error: 'Error updating comment.',
          err,
        });
      });
    }
  },
];

// Handle for deleting a comment under a post.
exports.comment_delete_delete = (req, res, next) => {
  // Find the post with postid.
  const found_post = Post.findById(req.params.postid)
  .then((found_post) => {
    // Find the comment with commentid.
    const comment = found_post.comments.id(req.params.commentid);

    if (comment == null) {
      // Comment is not found.
      res.status(404).json({
        error: 'Comment not found.',
      });
    } else {
      // Comment found, delete the comment.
      comment.deleteOne();
      found_post.save()
        .then(() => {
          res.status(200).json({
            message: 'Comment deleted successfully.',
          });
        })
        .catch((err) => {
          res.status(502).json({
            error: 'Error deleting comment.',
            err,
          })
        })
      };
  })
  .catch((err) => {
    res.status(404).json({
      error: 'Post not found.',
      err,
    });
  });
}