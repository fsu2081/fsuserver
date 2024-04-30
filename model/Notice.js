const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

noticeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Notice', noticeSchema);
