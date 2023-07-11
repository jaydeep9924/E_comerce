const express = require('express');
const router = express.Router();
const admin = require('../../model/admin');
const category = require('../../model/category');
const adminCo = require('../../controller/adminController/admin');
const passport = require('passport');
const validator = require('../../config/formvalidation');

router.get('/', adminCo.dashboard);
router.get('/profile', adminCo.profile);
router.get('/loginPage', adminCo.loginPage);
router.post('/login',passport.authenticate('admin',{failureRedirect : '/'}) , adminCo.login);
router.get('/admin', passport.CheckLogin, adminCo.adminForm);
router.post('/getadminData', admin.adminImgName, validator.form , adminCo.getadminData);
router.get('/adminData',passport.CheckLogin, adminCo.adminData);
router.get('/deleteAdmin/:id',passport.CheckLogin, adminCo.deleteAdmin);
router.post('/checkbox', adminCo.checkbox);
router.get('/password',passport.CheckLogin,adminCo.password);
router.post('/changepass', validator.password , adminCo.changepass);
router.get('/logout', (req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      next (err)
    }
  });
  req.flash('error','Log Out')
  return res.redirect('/');
});

 
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
});
router.post('/resetpassword', validator.resetpassword, adminCo.resetpassword);

router.use('/category', passport.CheckLogin,require('./category'));
router.use('/subcategory', passport.CheckLogin, require('./subcategory'));
router.use('/extracategory', passport.CheckLogin, require('./extracategory'));
router.use('/brand', passport.CheckLogin, require('./brand'));
router.use('/type', passport.CheckLogin, require('./type'));
router.use('/product', passport.CheckLogin, require('./product'));

module.exports = router;