const express = require("express");
const router = express.Router();
const galleryImageController = require("../controllers/galleryImageController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/gallery-images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/",
  upload.array("images"),
  galleryImageController.createGalleryImage
);
router.get("/:gallery_id", galleryImageController.getAllGalleryImages);
router.delete("/:gallery_id", galleryImageController.deleteGalleryImageById);

module.exports = router;
