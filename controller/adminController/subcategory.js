
const category = require('../../model/category');
const subcategory = require('../../model/subcategory');
const { validationResult, matchedData } = require('express-validator');

module.exports.formpage = async (req,res)=>{

  let data = await category.find({});
  return res.render('admin/form/subcategory',{
    catData : data,
  });
};

module.exports.subCatData = async(req,res)=>{

  let data = await category.find({});
  const errors= validationResult(req);
    if(!errors.isEmpty()){
      req.flash('error', "Fill Proper Detalis");
      var errMsg= errors.mapped();
      var inputData = matchedData(req);  
      res.render('admin/form/subcategory', {catData : data, errors:errMsg, inputData:inputData});  
    }
    else{
      var inputData = matchedData(req); 
      let data = await subcategory(req.body);
      data.save();
      if(data){
        req.flash('success','SubCategory Data Added');
        return res.redirect('/subcategory');
      }
      else{
        req.flash('error', 'Something Wrong');
        return res.redirect('/subcategory');
      }
    }
};


module.exports.subcategoryData = async(req,res)=>{

  if(req.query.active){
    await subcategory.findByIdAndUpdate(req.query.active,{
      isActive : false,
    });
    req.flash('error', 'Deactive');
    res.redirect('back');
  };

  if(req.query.deactive){
    await subcategory.findByIdAndUpdate(req.query.deactive,{
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
  let limit = 4;

  let data = await subcategory.find({
    $or :[
      {subcategoryName : {$regex : search, $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .populate('categoryId')
  .exec();

  let count = await subcategory.find({
    $or :[
      {subcategoryName : {$regex : search, $options : 'i'}}
    ]
  })
  .countDocuments();

  return res.render('admin/table/subcategory',{
    subdata : data,
    totalpage : Math.ceil(count/limit),
    searchdata : search,
    coundata : page
  });

};

module.exports.checkbox = async (req,res)=>{

  let check = await req.body.checkBoxClass;

  if(check){
    for(var i=0; i<check.length; i++){
      let data = await subcategory.findById(check[i]);
        if(data.isActive === true){
          await subcategory.findByIdAndUpdate(check[i],{
            isActive : false
          });
          req.flash('error', 'Deactive All');
        }
        else{
          await subcategory.findByIdAndUpdate(check[i],{
            isActive : true
          });
          req.flash('success', 'Active All');
        }
    }
    return res.redirect('back');
  }
  req.flash('error', 'Something Wrong');
  return res.redirect('back');
};

module.exports.deletedata = async (req,res)=>{
  await subcategory.findByIdAndDelete(req.params.id);
  req.flash('error','Subcategory Data is Deleted');
  return res.redirect('back');
};