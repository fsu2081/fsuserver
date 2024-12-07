const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Gallery = require("../model/Gallery");
const galleryController = require("../controllers/galleryController");

//storage
const storage = multer.diskStorage({
  destination: "uploads/gallery",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/",
  upload.single("thumbnail_url"),
  galleryController.createGallery
);
router.get("/", galleryController.getAllGalleries);
router.get("/:id", galleryController.getGalleryById);
// router.post('/:id', upload.array('files'), galleryController.updateGallery);
router.delete('/:id', galleryController.deleteGallery);

module.exports = router;
