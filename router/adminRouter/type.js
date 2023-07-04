
const express = require('express');

const router = express.Router();

const typrCo = require('../../controller/adminController/type');

var validation = require('../../config/formvalidation');

router.get('/', typrCo.formpage);

router.post('/gettypeData' , validation.type, typrCo.gettypeData); 

router.get('/typeData', typrCo.typeData);

router.post('/checkbox', typrCo.checkbox);

router.get('/deletedata/:id', typrCo.deletedata);


module.exports = router;