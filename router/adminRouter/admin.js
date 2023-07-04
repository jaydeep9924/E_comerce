const express = require('express');

const router = express.Router();

const admin = require('../../model/admin');

const category = require('../../model/category');

const adminCo = require('../../controller/adminController/admin');
const passport = require('passport');

// form validator 
const validator = require('../../config/formvalidation');

router.get('/', adminCo.dashboard);

// profile
router.get('/profile', adminCo.profile);

// login page
router.get('/loginPage', adminCo.loginPage);
router.post('/login',passport.authenticate('admin',{failureRedirect : '/'}) , adminCo.login);

// admin
router.get('/admin', passport.CheckLogin, adminCo.adminForm);
router.post('/getadminData', admin.adminImgName, validator.form , adminCo.getadminData);
router.get('/adminData',passport.CheckLogin, adminCo.adminData);
router.get('/deleteAdmin/:id',passport.CheckLogin, adminCo.deleteAdmin);

// checkbox
router.post('/checkbox', adminCo.checkbox);

// password
router.get('/password',passport.CheckLogin,adminCo.password);
router.post('/changepass', validator.password , adminCo.changepass);

// logout
router.get('/logout', (req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      next (err)
    }
  });
  req.flash('error','Log Out')
  return res.redirect('/');
});

// email 
router.get('/checkemailpage', (req,res)=>{
  res.render('admin/checkemail');
});

router.post('/checkemail', adminCo.checkemail);

router.get('/otp',(req,res)=>{
  return res.render('admin/otp');
})

router.post('/otp', adminCo.otp);

router.get('/resetpasspage', (req,res)=> {
   return res.render('admin/resetpassword');
})

router.post('/resetpassword', validator.resetpassword, adminCo.resetpassword);

// category
router.use('/category', passport.CheckLogin,require('./category'));

// subcategory
router.use('/subcategory', passport.CheckLogin, require('./subcategory'));

// extracategory
router.use('/extracategory', passport.CheckLogin, require('./extracategory'));

// brand
router.use('/brand', passport.CheckLogin, require('./brand'));

// type
router.use('/type', passport.CheckLogin, require('./type'));

// product
router.use('/product', passport.CheckLogin, require('./product'));


module.exports = router;