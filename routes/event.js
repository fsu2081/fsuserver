const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/event');
    } else {
      cb(new Error('Invalid fieldname'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validate file type or any other constraints if needed
    cb(null, true);
  },
});

router.post('/', upload.single('image'), eventController.handleNewEvent);
router.get('/', eventController.getAllEvent);
router.get('/:id', eventController.getSingleEvent);

module.exports = router;
