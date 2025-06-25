// routes/ArticleCategoryRouter.js
const express = require('express');
const router = express.Router();
const ArticleCategoryController = require('../Controller/ArticleCategoryController');

router.post('/', ArticleCategoryController.create);
router.put('/:id', ArticleCategoryController.update);
router.delete('/:id', ArticleCategoryController.delete);
router.get('/', ArticleCategoryController.findAll);
router.get('/:id', ArticleCategoryController.findById);

module.exports = router;
