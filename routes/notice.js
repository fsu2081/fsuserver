const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

const multer = require('multer');

//can handle both image and pdf upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/notice');
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

router.post('/', upload.single('image'), noticeController.handleNewNotice);
router.get('/', noticeController.getAllNotice);
router.get('/recent', noticeController.getRecentNotice);
router.get('/:id', noticeController.getSingleNotice);

router.delete('/:id', noticeController.deleteNotice);

module.exports = router;
