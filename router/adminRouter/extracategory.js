
const express = require('express');
const router = express.Router();
const extraCO = require('../../controller/adminController/extracategory');
const validator = require('../../config/formvalidation');

router.get('/', extraCO.formpage);
router.post('/getSubcategoryData', extraCO.subcategorydata);
router.post('/getextracategory', validator.extracategoryForm , extraCO.getextracategory);
router.get('/extracategorydata', extraCO.extracategorydata);
router.post('/checkbox', extraCO.checkbox);
router.get('/deletedata/:id', extraCO.deletedata);

module.exports = router;