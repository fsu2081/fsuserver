const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    description: { type: String, default: "" },
    thumbnail_url: {
      type: String,
    },
  },
  { timestamps: true }
);

// gallerySchema.index({ event_id: 1 });

module.exports = mongoose.model("Gallery", gallerySchema);
