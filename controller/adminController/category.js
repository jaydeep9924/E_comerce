
const category = require('../../model/category');

const { validationResult, matchedData } = require('express-validator');

module.exports.categorypage = (req,res)=>{
  return res.render('admin/form/category');
};

module.exports.getcategorydata = async (req,res)=>{

  const errors= validationResult(req);
    if(!errors.isEmpty()){
      req.flash('error', "Fill Proper Detalis");
      var errMsg= errors.mapped();
      var inputData = matchedData(req);  
      res.render('admin/form/category', {errors:errMsg, inputData:inputData});  
    }
    else{
      var inputData = matchedData(req); 

      let img='';
      if(req.file){
        img = category.categoryImgUploaded+'/'+req.file.filename;
      }
      req.body.categoryImage = img;
      let data = await category(req.body);
      data.save();
      if(data){
        req.flash('success', 'Category Data Added');
        return res.redirect('/category');
      }
      else{
        req.flash('erroe', 'Something Wrong');
        return res.redirect('/category');
      }
    } 
};

module.exports.categorydata = async (req,res)=>{

  if(req.query.active){
    await category.findByIdAndUpdate(req.query.active,{
      isActive : false,
    });
    req.flash('error', 'Deactive');
    res.redirect('back');
  };

  if(req.query.deactive){
    await category.findByIdAndUpdate(req.query.deactive,{
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
  }
  let limit = 3;

  let data = await category.find({
    $or :[
      {categoryName :{$regex : search, $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .exec();

  let count =  await category.find({
    $or :[
      {categoryName :{$regex : search, $options : 'i'}}
    ]
  })
  .countDocuments();

  if(data){
    return res.render('admin/table/categoryData',{
      cateData : data,
      totalpage : Math.ceil(count/limit),
      currentpage : page,
      searchdata : search,
    });
  };

};

module.exports.checkbox = async (req,res)=>{

  let check = await req.body.checkboxid;
  if(check){
    for(var i=0; i<check.length; i++){
      let data = await category.findById(check[i]);
      if(data.isActive === true){
        await category.findByIdAndUpdate(check[i],{
          isActive : false
        });
        req.flash('error', 'Deactive All');
      }
      else{
        await category.findByIdAndUpdate(check[i],{
          isActive : true
        });
        req.flash('success', 'Active All');
      }
    }
  }
  else{
    req.flash('error','Something Wrong');
    return res.redirect('back');
  }
  return res.redirect('back');
};

module.exports.deletcategory = async (req,res)=>{
  await category.findByIdAndDelete(req.params.id);
  req.flash('error', 'Category Data is Deleted');
  return res.redirect('back');
}