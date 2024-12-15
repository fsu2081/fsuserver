const { default: mongoose } = require("mongoose");
const GalleryImage = require("../model/GalleryImage");
const fs = require("fs");
const path = require("path");

exports.createGalleryImage = async (req, res) => {
  try {
    const { gallery_id } = req.body;
    const files = req.files;

    if (!gallery_id || !files || files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "gallery_id and at least one image are required",
      });
    }
    const galleryImages = files.map((file) => ({
      gallery_id,
      image_url: `${file.destination}/${file.filename}`,
    }));
    const savedGalleryImages = await GalleryImage.insertMany(galleryImages);
    res.status(201).json({ status: "success", data: savedGalleryImages });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

exports.getAllGalleryImages = async (req, res) => {
  const { gallery_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(gallery_id)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid gallery ID format" });
  }
  try {
    const galleryImages = await GalleryImage.find({ gallery_id: gallery_id });
    if (!galleryImages) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery not found" });
    }
    res.status(200).json({ status: "success", data: galleryImages });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getGalleryImageById = async (req, res) => {
  try {
    const galleryImage = await GalleryImage.findById(req.params.id);
    if (!galleryImage) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery image not found" });
    }
    res.status(200).json({ status: "success", data: galleryImage });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteGalleryImageById = async (req, res) => {
  try {
    const galleryImage = await GalleryImage.findById(req.params.gallery_id);
    if (!galleryImage) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery image not found" });
    }
    const filePath = path.resolve(__dirname, "../", galleryImage.image_url);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
    await GalleryImage.findByIdAndDelete(req.params.gallery_id);

    res
      .status(200)
      .json({ status: "success", message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
