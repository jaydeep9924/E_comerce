
const category = require('../../model/category');
const subcategory = require('../../model/subcategory');
const extracategory = require('../../model/extracategory');
const brand =  require('../../model/brand');
const { validationResult, matchedData } = require('express-validator');

module.exports.formpage = async (req,res)=>{

  let data = await category.find({});
  return res.render('admin/form/brand',{
    catdata : data
  });

};

module.exports.extracategorydata = async (req,res)=>{

  let data =  await extracategory.find({subcategoryId : req.body.subcategoryId})
  return res.render('admin/extracategoryajax',{
    extradata : data
  })
};

module.exports.brandadded = async (req,res)=>{
  let data = await category.find({});

  const errors= validationResult(req);
    if(!errors.isEmpty()){
      req.flash('error', "Fill Proper Detalis");
      var errMsg= errors.mapped();
      var inputData = matchedData(req);  
      res.render('admin/form/brand', {catdata : data, errors:errMsg, inputData:inputData});  
    }
    else{
      var inputData = matchedData(req); 
  
      let data = await brand(req.body);
      data.save();
      if(data){
        req.flash('success','Brand Data Added');
        return res.redirect('/brand');
      }
      else{
        req.flash('error', 'Something Wrong');
        return res.redirect('/brand');
      }
    }
};

module.exports.brandData = async (req,res)=>{

  if(req.query.active){
    await brand.findByIdAndUpdate(req.query.active,{
      isActive : false,
    });
    req.flash('error', 'Deactive');
    res.redirect('back');
  };

  if(req.query.deactive){
     await brand.findByIdAndUpdate(req.query.deactive,{
      isActive : true,
    });
    req.flash('success', 'Active');
    res.redirect('back');
  };

  let search = '';
  if(req.query.search){
    search = req.query.search;
  };

  let page = 1;
  if(req.query.page){
    page = req.query.page;
  };
  let limit = 3;

  let data = await brand.find({
    $or :[
      {brandname : {$regex : search, $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .populate('categoryId')
  .populate('subcategoryId')
  .populate('extracategoryId')
  .exec();

  let count = await brand.find({
    $or :[
      {brandname : {$regex : search, $options : 'i'}}
    ]
  })
  .countDocuments();

  return res.render('admin/table/brand',{
    subdata : data,
    totalpage : Math.ceil(count/limit),
    searchdata : search,
    countdata : page
  });
};

module.exports.checkbox = async (req,res)=>{

  let check = await req.body.checkBoxClass;
  if(check){
    for(var i=0; i<check.length; i++){

      let data = await brand.findById(check[i]);

        if(data.isActive === true){
          await brand.findByIdAndUpdate(check[i],{
            isActive : false
          });
          req.flash('error', 'Deactive All');
        }
        else{
          await brand.findByIdAndUpdate(check[i],{
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
  await brand.findByIdAndDelete(req.params.id);
  req.flash('error','brand Data is Deleted');
  return res.redirect('back');
};