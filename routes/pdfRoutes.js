const express = require('express');
const router = express.Router();

const pdfController = require('../controllers/pdfController');

const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            cb(null, false);
            return;
        }
        cb(null, true);
    }
})

router.post('/upload', upload.single('file'), pdfController.parseTransactions);

module.exports = router;