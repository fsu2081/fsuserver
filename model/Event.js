const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    registration: { type: String, required: true },
    facebook: { type: String, required: true },
    date: { type: Date, required: true },
    thumbnail_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

eventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Event", eventSchema);
