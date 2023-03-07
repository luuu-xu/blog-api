const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = require('./comment').CommentSchema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  is_published: {type: Boolean, required: true },
  comments: [CommentSchema],
});

module.exports = mongoose.model('Post', PostSchema);