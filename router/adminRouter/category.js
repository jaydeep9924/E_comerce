const express = require('express');
const router = express.Router();
const categoryCo = require('../../controller/adminController/category');
const category = require('../../model/category');
const validation = require('../../config/formvalidation');

router.get('/', categoryCo.categorypage);
router.post('/getcategorydata', category.categoryImgName, validation.categoryForm , categoryCo.getcategorydata);
router.get('/categorydata', categoryCo.categorydata);
router.post('/checkbox', categoryCo.checkbox);
router.get('/deletecategory/:id', categoryCo.deletcategory);

module.exports = router;