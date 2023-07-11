
const category = require('../../model/category');
const subcategory = require('../../model/subcategory');
const extracategory = require('../../model/extracategory');
const product = require('../../model/product');
const brand = require('../../model/brand');
const type = require('../../model/type');
const comment = require('../../model/frontPannel/comment');
const register = require('../../model/frontPannel/register');
const cart = require('../../model/frontPannel/addcart');
const payment = require('../../model/frontPannel/payment');
const { openDelimiter } = require('ejs');
const stripe = require("stripe")("sk_test_51NJA96SBCdMir55xvbEwU7qZNObH63ogACMOLvSLctJMZteizHKmlez7itlSSj5ihKMtqK0ZUs7GqxPEacCeWKEJ00DMSLMClW");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

module.exports.dashboard = async (req,res)=>{

  var data = await product.find({isActive : true});
  let catdata = await category.find({isActive : true});
  let subdata = await subcategory.find({isActive : true});
  let extradata = await extracategory.find({isActive : true});
  var cartData = 0;
    if(req.user){ 
      let userCartCount = await cart.find({userId : req.user.id}).countDocuments();
      req.session.cartData = userCartCount;
      cartData = req.session.cartData;
    }

  return res.render('frontuser/dashboard',{
    catrecord : catdata,
    subrecord : subdata,
    extrarecord : extradata,
    productrecord : data,
    cartData :cartData,
  });
};

module.exports.shop = async (req,res)=>{

  let catdata = await category.find({isActive : true});
  let subdata = await subcategory.find({isActive : true});
  let extradata = await extracategory.find({isActive : true});
  let productdata = await product.find({isActive : true});
  let typedata = await type.find({});
  let branddata = await brand.find({});

  var cartData = 0;
    if(req.user){ 
      let userCartCount = await cart.find({userId : req.user.id}).countDocuments();
      req.session.cartData = userCartCount;
      cartData = req.session.cartData;
    }
  return res.render('frontuser/allproduct',{
    productrecord :productdata,
    cartData : cartData,
    catrecord : catdata,
    subrecord : subdata,
    extrarecord : extradata,
    typerecord : typedata,
    brandrecord : branddata
  });
};

module.exports.getproductdata = async (req,res)=>{
  var catdata = await req.params.catId;
  var subdata = await req.params.subId;
  var extdata = await req.params.extId;

  let data = await product.find({categoryId : catdata, subcategoryId : subdata, extracategoryId : extdata});
  let cat = await category.find({isActive : true});
  let sub = await subcategory.find({isActive : true});
  let extra = await extracategory.find({isActive : true});
  let brandrecord = await brand.find({categoryId : catdata, subcategoryId : subdata, extracategoryId : extdata});
  let typerecord = await type.find({categoryId : catdata, subcategoryId : subdata, extracategoryId : extdata});
  var cartData = 0;
    if(req.user){ 
      let userCartCount = await cart.find({userId : req.user.id}).countDocuments();
      req.session.cartData = userCartCount;
      cartData = req.session.cartData;
    }

  return res.render('frontuser/shop',{
    catrecord : cat,
    subrecord : sub,
    extrarecord : extra,
    productrecord : data,
    brandData : brandrecord,
    typeData : typerecord,
    cartData : cartData
  });
};

module.exports.filterdata = async (req,res)=>{

  const data = await product.find({brandId : req.body.filter});
  return res.render('frontuser/filter',{
    productrecord : data
  });
};

module.exports.typefilter = async (req,res)=>{

  const data = await product.find({typeId : req.body.typefilter});
  return res.render('frontuser/typefilter',{
    typerecord : data
  })
};

module.exports.productview = async (req,res)=>{

  let data = await product.find({});
  let cat = await category.find({isActive : true});
  let sub = await subcategory.find({isActive : true});
  let extra = await extracategory.find({isActive : true});
  let prodata= await product.findById(req.params.id).populate('categoryId').populate('brandId').exec();

  let commentdata = await comment.find({productId : req.params.id});
  let commentcount = await comment.find({productId : req.params.id}).countDocuments();
  var cartData = 0;
  if(req.user){ 
    cartData = req.session.cartData;
  }

  return res.render('frontuser/product',{
    catrecord : cat,
    subrecord : sub,
    extrarecord : extra,
    prorecord : prodata,
    productrecord : data,
    commentrecord : commentdata,
    commentcount :commentcount,
    cartData : cartData
  });
};

module.exports.comment = async (req,res)=>{

      var img = '';
      if(req.file){
        img = comment.imgfilename+'/'+req.file.filename;
      }
      req.body.commentimg = img;
    
      let data = await comment(req.body);
      data.save();
      if(data){
        req.flash('success','Comment Added Succesfully');
        return res.redirect('back');
      }
      else{
        req.flash('error', 'Something Wrong');
        return res.redirect('back');
      };
};

module.exports.loginPage = async (req,res)=>{

  let cat = await category.find({isActive : true});
  let sub = await subcategory.find({isActive : true});
  let extra = await extracategory.find({isActive : true});
  var cartData = 0;
  if(req.user){ 
    cartData = req.session.cartData;
  };
  return res.render('frontuser/login',{
    catrecord : cat,
    subrecord : sub,
    extrarecord : extra,
    cartData : cartData
  })

};

module.exports.register = async (req,res)=>{
  let cat = await category.find({isActive : true});
  let sub = await subcategory.find({isActive : true});
  let extra = await extracategory.find({isActive : true});
  var cartData = 0;
  if(req.user){ 
    cartData = req.session.cartData;
  };

  return res.render('frontuser/register',{
    catrecord : cat,
    subrecord : sub,
    extrarecord : extra,
    cartData : cartData
  });
};

module.exports.registerdata = async (req,res)=>{

  let cat = await category.find({isActive : true});
  let sub = await subcategory.find({isActive : true});
  let extra = await extracategory.find({isActive : true});
  var cartData = 0;
  if(req.user){ 
    cartData = req.session.cartData;
  };

  const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('frontuser/register', {
          alert,
          catrecord : cat,
          subrecord : sub,
          extrarecord : extra,
          cartData : cartData
        })
    }
    else{
      let data = await register.findOne({username : req.body.username});
  
      if(!data){
          let record = await register(req.body);
          record.save();
          if(record){
            req.flash('success','Register Successfully');
            res.redirect('/user/login');
          }
          else{
            req.flash('error','Something Wrong');
            res.redirect('/user/register');
          }
      }
      else{
        req.flash('error','Email is Allready Register');
        res.redirect('/user/register');
      }
    }
  
};

module.exports.logindata = async (req,res)=>{
  req.flash('success', "Login Successfully");
  return res.redirect('/user');
};

module.exports.addtocart = async (req,res)=>{

  if(req.user){
    let check = await cart.find({productId : req.body.productId,userId : req.body.userId});

    if(check.length){
      req.flash('error','Product Allready In Cart');
      res.redirect('back');
    }
    else{
      let data = await cart(req.body);
      data.save();
      let userCartCount = await cart.find({userId : req.body.userId}).countDocuments();
      req.session.cartData = userCartCount;
  
      if(data){
        req.flash('success','Product Added In Cart');
        res.redirect('back');
      }
      else{
        req.flash('error','Something Wrong');
        res.redirect('back');
      }
    }
  }
  else{
    res.redirect('/user/login');
  }
};

module.exports.shoppingcart = async (req,res)=>{

  if(req.user){

    let catdata = await category.find({isActive : true});
    let subdata = await subcategory.find({isActive : true});
    let extradata = await extracategory.find({isActive : true});
    let productdata = await cart.find({userId : req.user.id}).populate('productId').exec();
    
    var cartData = 0;
    if(req.user){ 
      let userCartCount = await cart.find({userId : req.user.id}).countDocuments();
      req.session.cartData = userCartCount;
      cartData = req.session.cartData;
    }
    return res.render('frontuser/shoppingcart',{
      catrecord : catdata,
      subrecord : subdata,
      extrarecord : extradata,
      productrecord : productdata,
      cartData : cartData
    });
  }
  else{
    res.redirect('/user/login');
  }
};

module.exports.quantity = async (req,res)=>{  
 
  let data = await cart.findOne({userId : req.user.id ,_id : req.body.productId});
  if(data){
    await cart.findByIdAndUpdate(data.id,{
      quantity : req.body.quantity,
    });
    return res.json({msg:"quantity Updated"});
  }
  else{
    return res.json({msg:"something wrong"});
  }
};

module.exports.deletcart = async (req,res)=>{
  let data = await cart.findByIdAndDelete(req.params.id);
  if(data){

    req.flash('error','Product Remove In Cart');
    return res.redirect('/user/shoppingcart');
  }
  else{
    req.flash('error','Something Wrong');
    res.redirect('back');
  }
};

module.exports.checkoutdata = async (req,res)=>{

  if(req.user){
    let catdata = await category.find({isActive : true});
    let subdata = await subcategory.find({isActive : true});
    let extradata = await extracategory.find({isActive : true});
    let cartrecord = await cart.find({userId : req.user.id}).populate('productId').exec();

    var cartData = 0;
    if(req.user){ 
      let userCartCount = await cart.find({userId : req.user.id}).countDocuments();
      req.session.cartData = userCartCount;
      cartData = req.session.cartData;
    }

    return res.render('frontuser/checkout',{
      catrecord : catdata,
      subrecord : subdata,
      extrarecord : extradata,
      cartData : cartData,
      cartrecord : cartrecord,
    });
  }
  else{
    res.redirect('/user/login');
  } 
};

module.exports.payment = async (req,res)=>{

  if(req.user){
    let catdata = await category.find({isActive : true});
    let subdata = await subcategory.find({isActive : true});
    let extradata = await extracategory.find({isActive : true});
    let cartrecord = await cart.find({userId : req.user.id}).populate('productId').exec();

    var cartData = 0;
    if(req.user){ 
      let userCartCount = await cart.find({userId : req.user.id}).countDocuments();
      req.session.cartData = userCartCount;
      cartData = req.session.cartData;
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('frontuser/checkout', {
          alert,
          catrecord : catdata,
          subrecord : subdata,
          extrarecord : extradata,
          cartData : cartData,
          cartrecord : cartrecord,
        })
    }
    else{
      var nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
    
      req.body.orderstatus = "Pending Order";
      req.body.ordertime = nDate;
      req.body.user_id = req.user.id;
    
      let data = await payment(req.body);
      data.save();
      if(data){
        let record = await cart.find({userId : req.user.id});
        for(var i=0; i<record.length; i++){
          await cart.findByIdAndDelete(record[i].id);
        }
        
        let paymentdata = await payment.findById(data.id);
        return res.render('frontuser/payment',{
          data : paymentdata
        });
      }
      else{
        req.flash('error', 'something wrong');
        return res.redirect('back')
      }
    }
  }
  else{
    res.redirect('/user/login');
  } 
};

module.exports.paymentstripe = async (req,res)=>{

  if(req.user){
    let update = await payment.findById(req.body.paymentId);
    await payment.findByIdAndUpdate(update.id,{orderstatus : 'Confirm Order'});
  
    try {
      await stripe.paymentIntents.create({
          amount: (req.body.totalamount)*100,
          currency: "inr",
          payment_method_types: ["card"],
          receipt_email: req.body.email,
        },
        function (err, paymentIntent) {
          if (err) {
            throw new Error("failed to charge");
          }
          return res.render('frontuser/payment_confirm');
        }
      );
    } catch (err) {
      console.log(err, "error occure");
    }
  }
  else{
    res.redirect('/user/login');
  } 
};

module.exports.confirm_order = async (req,res)=>{
  if(req.user){

    let catdata = await category.find({isActive : true});
    let subdata = await subcategory.find({isActive : true});
    let extradata = await extracategory.find({isActive : true});
    let data = await payment.find({user_id : req.user.id});

    var cartData = 0;
    if(req.user){ 
      let userCartCount = await cart.find({userId : req.user.id}).countDocuments();
      req.session.cartData = userCartCount;
      cartData = req.session.cartData;
    }

    if(data){
      return res.render('frontuser/confirm_order',{
        catrecord : catdata,
        subrecord : subdata,
        extrarecord : extradata,
        cartData : cartData,
        data : data
      });      
    }
    else{
      req.flash('error','Something Wrong');
      return false;
    }
  }
  else{
    res.redirect('/user/login');
  } 
};

module.exports.deletorder = async (req,res)=>{
  let data = await payment.findByIdAndDelete(req.params.id);
  if(data){
    req.flash('error','Order Cancel');
    return res.redirect('back');
  }
  else{
    req.flash('error','Something Wrong');
    return res.redirect('back');
  }
};