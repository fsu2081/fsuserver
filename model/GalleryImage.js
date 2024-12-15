const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    gallery_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery",
      required: true,
    },
    image_url: { type: String, required: true },
  },
  { timestamps: true }
);
// galleryImageSchema.index({ gallery_id: 1 });
module.exports = mongoose.model("GalleryImage", galleryImageSchema);
