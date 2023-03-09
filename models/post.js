const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const { CommentSchema } = require('./comment');

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  is_published: {type: Boolean, default: true },
  comments: [CommentSchema],
}, { toJSON: { virtuals: true } });

PostSchema.virtual('timestamp_formatted_date').get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Post', PostSchema);