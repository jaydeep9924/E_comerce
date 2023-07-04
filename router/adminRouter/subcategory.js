const express = require('express');

const router = express.Router();

const subcatCO = require('../../controller/adminController/subcategory');
const validator = require('../../config/formvalidation');
router.get('/', subcatCO.formpage);

router.post('/subCatdata', validator.subcategoryForm ,subcatCO.subCatData);

router.get('/subcategoryData', subcatCO.subcategoryData);

router.post('/checkbox', subcatCO.checkbox);

router.get('/deletedata/:id', subcatCO.deletedata);

module.exports = router;