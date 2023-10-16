const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');
const {validateCreateUser} = require("../validators/userValidator");

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.get('/:id/transactions', transactionController.getByUserId);
router.post('/', validateCreateUser, userController.create);

module.exports = router;