
const category = require('../../model/category');
const type = require('../../model/type');
const brand = require('../../model/brand');
const product = require('../../model/product');
const { validationResult, matchedData } = require('express-validator');

module.exports.productform = async (req,res)=>{

  let catdata = await category.find({});
  return res.render('admin/form/product',{
    catrecord : catdata,
  })
};

module.exports.getbrandtypedata = async (req,res)=>{

  let checkType = await type.find({categoryId : req.body.catrecord, subcategoryId : req.body.subrecord, extracategoryId : req.body.extrecord});
  let checkBrand = await brand.find({categoryId : req.body.catrecord, subcategoryId : req.body.subrecord, extracategoryId : req.body.extrecord});

  return res.render('admin/getBrandTypeData',{
    typerecord : checkType,
    brandrecord : checkBrand
  })

};

module.exports.productdata = async (req,res)=>{
  let catdata = await category.find({});

  const errors= validationResult(req);
    if(!errors.isEmpty()){
      req.flash('error', "Fill Proper Detalis");
      var errMsg= errors.mapped();
      var inputData = matchedData(req);  
      res.render('admin/form/product', {catrecord : catdata, errors:errMsg, inputData:inputData});  
    }
    else{
      var inputData = matchedData(req); 
      var sinimg = '';  
      if(req.files.productImg){
        sinimg = product.singleImg+'/'+req.files.productImg[0].filename;
      }

      var multimg = [];
      if(req.files.productImages){
        for(var i=0; i<req.files.productImages.length; i++){
          multimg.push(product.multiImg+'/'+req.files.productImages[i].filename);
        }
      }
      req.body.productImg = sinimg;
      req.body.productImages = multimg;
      let data = await product(req.body);
      data.save();
      if(data){
        req.flash('success','Product Added Sucessfully');
        return res.redirect('/product');
      }
      else{
        req.flash('error','Something Wrong');
        return res.redirect('/product');
      }
    } 
};

module.exports.viewproduct = async (req,res)=>{

  if(req.query.active){
    await product.findByIdAndUpdate(req.query.active,{
      isActive : false,
    });
    req.flash('error', 'Deactive');
    res.redirect('back');
  };

  if(req.query.deactive){
     await product.findByIdAndUpdate(req.query.deactive,{
      isActive : true,
    });
    req.flash('success', 'Active');
    res.redirect('back');
  };

  let search = '';
  if(req.query.search){
    search = req.query.search;
  };

  let page =1;
  if(req.query.page){
    page = req.query.page;
  }
  let limit = 3;

  const data = await product.find({
    $or : [
      {productName : {$regex : search, $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .populate('categoryId')
  .populate('subcategoryId')
  .populate('extracategoryId')
  .populate('typeId')
  .populate('brandId')
  .exec();

  let count = await type.find({
    $or :[
      {typename : {$regex : search, $options : 'i'}}
    ]
  })
  .countDocuments();

  return res.render('admin/table/product',{
    record : data,
    totalpage : Math.ceil(count/limit),
    searchdata : search,
    countdata : page,
  });
};

module.exports.checkbox = async (req,res)=>{

  let check = await req.body.checkBoxClass;
  if(check){
    for(var i=0; i<check.length; i++){

      let data = await product.findById(check[i]);
        if(data.isActive === true){
          await product.findByIdAndUpdate(check[i],{
            isActive : false
          });
          req.flash('error', 'Deactive All');
        }
        else{
          await product.findByIdAndUpdate(check[i],{
            isActive : true
          });
          req.flash('success', 'Active All');
        }
    }
    return res.redirect('back');
  }
  req.flash('error','Something Wrong');
  return res.redirect('back');
};

module.exports.deletedata = async (req,res)=>{
  await product.findByIdAndDelete(req.params.id);
  req.flash('error','Product Data is Deleted');
  return res.redirect('back');
};
