const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.adminLogin);
router.post('/logout', adminController.adminLogout);

router.get('/isAdmin', adminController.isAdmin);

module.exports = router;
