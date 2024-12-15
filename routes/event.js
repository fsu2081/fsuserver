const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "thumbnail_url") {
      cb(null, "uploads/event");
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validate file type or any other constraints if needed
    cb(null, true);
  },
});

router.post("/", upload.single("thumbnail_url"), eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

module.exports = router;
