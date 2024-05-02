const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/project');
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

// Create a new project
router.post('/', upload.single('image'), projectController.handleNewProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get a project by ID
router.get('/:id', projectController.getProjectById);

router.delete('/:id', projectController.deleteProject);

module.exports = router;
