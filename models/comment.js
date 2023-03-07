const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

exports.CommentSchema = CommentSchema;
exports.Comment = mongoose.model('Comment', CommentSchema);