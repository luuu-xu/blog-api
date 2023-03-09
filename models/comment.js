const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const CommentSchema = new Schema({
  text: { type: String, required: true },
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { toJSON: { virtuals: true } });

CommentSchema.virtual('timestamp_formatted_datetime').get(function() {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
})

exports.CommentSchema = CommentSchema;
exports.Comment = mongoose.model('Comment', CommentSchema);