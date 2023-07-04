
const express = require('express');

const router = express.Router();

const brandCo = require('../../controller/adminController/brand');

var validation = require('../../config/formvalidation');

router.get('/', brandCo.formpage);

router.post('/getextracategorydata' , brandCo.extracategorydata); 

router.post('/brandadded' , validation.brand , brandCo.brandadded);

router.get('/brandData', brandCo.brandData);

router.post('/checkbox', brandCo.checkbox);

router.get('/deletedata/:id', brandCo.deletedata);

module.exports = router;  