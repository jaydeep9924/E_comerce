
const category =  require('../../model/category');

const type =  require('../../model/type');

const { validationResult, matchedData } = require('express-validator');

module.exports.formpage = async (req,res)=>{

  let data = await category.find({});
  return res.render('admin/form/type',{
    catdata : data
  });

};

module.exports.gettypeData = async (req,res)=>{
  let data = await category.find({});

  const errors= validationResult(req);
    if(!errors.isEmpty()){
      req.flash('error', "Fill Proper Detalis");
      var errMsg= errors.mapped();
      var inputData = matchedData(req);  
      res.render('admin/form/type', {catdata : data, errors:errMsg, inputData:inputData});  
    }
    else{
      var inputData = matchedData(req); 
      // insert query will be written here
      let data = await type(req.body);
      data.save();

      if(data){
        req.flash('success','Type Data Added');
        return res.redirect('/type');
      }
      else{
        req.flash('error', 'Something Wrong');
        return res.redirect('/type');
      }
    } 

  
};

module.exports.typeData = async (req,res)=>{

  if(req.query.active){
    await type.findByIdAndUpdate(req.query.active,{
      isActive : false,
    });
    req.flash('error', 'Deactive');
    res.redirect('back');
  };

  if(req.query.deactive){
     await type.findByIdAndUpdate(req.query.deactive,{
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

  let data = await type.find({
    $or :[
      {typename : {$regex : search, $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .populate('categoryId')
  .populate('subcategoryId')
  .populate('extracategoryId')
  .exec();

  let count = await type.find({
    $or :[
      {typename : {$regex : search, $options : 'i'}}
    ]
  })
  .countDocuments();

  return res.render('admin/table/type',{
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

      let data = await type.findById(check[i]);
        if(data.isActive === true){
          await type.findByIdAndUpdate(check[i],{
            isActive : false
          });
          req.flash('error', 'Deactive All');
        }
        else{
          await type.findByIdAndUpdate(check[i],{
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
  await type.findByIdAndDelete(req.params.id);
  req.flash('error','Type Data is Deleted');
  return res.redirect('back');
};