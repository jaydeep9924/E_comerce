
const category = require('../../model/category');

const subcategory = require('../../model/subcategory');

const extracategory = require('../../model/extracategory');

// form validator
const { validationResult, matchedData } = require('express-validator');

module.exports.formpage = async (req,res)=>{

  let data = await category.find({});
  return res.render('admin/form/extracategory',{
    catdata : data
  });
};

module.exports.subcategorydata = async (req,res)=>{

  let subCatData = await subcategory.find({categoryId:req.body.categoryId});
  var option = `<option value=''>--Select Subcategory--</option>`;
  for(var sub of subCatData){
    option += `<option value='${sub.id}'> ${sub.subcategoryName} </option>`;
  }

  return res.json(option);

};

module.exports.getextracategory = async (req,res)=>{
  let data = await category.find({});

  const errors= validationResult(req);
    if(!errors.isEmpty()){
      req.flash('error', "Fill Proper Detalis");
      var errMsg= errors.mapped();
      var inputData = matchedData(req);  
      res.render('admin/form/extracategory', {catdata : data, errors:errMsg, inputData:inputData});  
    }
    else{
      var inputData = matchedData(req); 

      let data = await extracategory(req.body);
      data.save(); 
      if(data){
        req.flash('success', 'Data Added Succesfully');
        return res.redirect('/extracategory');
      }
      else{
        req.flash('error', 'Data Not Added Succesfully');
        return res.redirect('/extracategory');
      }
    } 
};

module.exports.extracategorydata = async (req,res)=>{

  if(req.query.active){
    await extracategory.findByIdAndUpdate(req.query.active,{
      isActive : false,
    });
    req.flash('error', 'Deactive');
    res.redirect('back');
  };

  if(req.query.deactive){
    let set =  await extracategory.findByIdAndUpdate(req.query.deactive,{
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

  let data = await extracategory.find({
    $or :[
      {extracategoryName : {$regex : search, $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .populate('categoryId')
  .populate('subcategoryId')
  .exec();

  let count = await extracategory.find({
    $or :[
      {extracategoryName : {$regex : search, $options : 'i'}}
    ]
  })
  .countDocuments();

  return res.render('admin/table/extracategory',{
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

      let data = await extracategory.findById(check[i]);

        if(data.isActive === true){
          await extracategory.findByIdAndUpdate(check[i],{
            isActive : false
          });
          req.flash('error', 'Deactive All');
        }
        else{
          await extracategory.findByIdAndUpdate(check[i],{
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
  await extracategory.findByIdAndDelete(req.params.id);
  req.flash('error','extracategory Data is Deleted');
  return res.redirect('back');
};