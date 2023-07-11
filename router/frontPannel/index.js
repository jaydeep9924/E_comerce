
const express = require('express');
const router = express.Router();
const comment = require('../../model/frontPannel/comment');
const userCon = require('../../controller/frontPannel/index');
const passport = require('passport');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', userCon.dashboard);
router.get('/shop', userCon.shop);
router.get('/getproduct/:catId/:subId/:extId', userCon.getproductdata);
router.post('/filterdata', userCon.filterdata);
router.post('/typefilter', userCon.typefilter);
router.get('/productview/:id', userCon.productview);
router.post('/comment',comment.imguploader, userCon.comment);
router.get('/login', userCon.loginPage);
router.get('/register', userCon.register);
router.post('/registerdata',urlencodedParser, [
  check('username', 'Email is not valid')
      .isEmail()
      .normalizeEmail()
      .notEmpty(),
      check('pass', 'Password required').trim().notEmpty(),
      check('con_pass').custom((value, { req }) => {
        if (value !== req.body.pass) {
           throw new Error('Password Confirmation does not match password');
        }
         return true;
      })
  
], userCon.registerdata);

router.post('/logindata',passport.authenticate('user',{failureRedirect : '/user/login',failureFlash : 'Enter Valid Email or Password'}) ,userCon.logindata);

router.get('/logout', (req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      next (err)
    }
  });
  return res.redirect('/user')
});
router.post('/addtocart', userCon.addtocart);
router.get('/shoppingcart', userCon.shoppingcart);
router.post('/quantity', userCon.quantity);
router.get('/deletcart/:id', userCon.deletcart);
router.get('/checkoutdata', userCon.checkoutdata);

router.post('/payment',  [
  check('name', 'Name Required')
    .notEmpty(),
  check('cum_name', 'Enter Valid Company Name')
    .notEmpty(),
  check('coun', 'Enter Country Name')
    .notEmpty(),
  check('street', 'Enter Address')
    .notEmpty(),
  check('zip', 'Enter Postcode / ZIP')
    .notEmpty(),
  check('town', 'Enter City Name')
    .notEmpty(),
  check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail()
    .notEmpty(),
  check('phone', 'Enter Phone Number')
    .notEmpty()
    .isLength({ min: 9 }),
  
],userCon.payment);

router.post('/paymentstripe', userCon.paymentstripe);
router.get('/confirm_order', userCon.confirm_order);
router.get('/deletorder/:id', userCon.deletorder);

module.exports = router;