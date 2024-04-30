const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
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
    registration: {
      type: String,
    },
    facebook: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

eventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event', eventSchema);
