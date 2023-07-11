
const express = require('express');
const router = express.Router();
const productCo = require('../../controller/adminController/product');
const product = require('../../model/product');
const validator = require('../../config/formvalidation');

router.get('/', productCo.productform);
router.post('/getbrandtypedata', productCo.getbrandtypedata);
router.post('/productdata', product.productImg, validator.product, productCo.productdata);
router.get('/viewproduct', productCo.viewproduct);
router.post('/checkbox', productCo.checkbox);
router.get('/deletedata/:id', productCo.deletedata);

module.exports = router;