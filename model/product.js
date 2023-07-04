
const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const singleImg = '/img/productsingelimg';

const multipalImg = '/img/productmultipalimg';

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});

const productSchema = mongoose.Schema({
  categoryId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'category',
    required : true,
  },
  subcategoryId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'subcategory',
    required : true,
  },
  extracategoryId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "extracategory",
    required : true
  },
  typeId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'type',
    required : true,
  },
  brandId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'brand',
    required : true,
  },
  productName :{
    type : String,
    required : true,
  },
  productPrice :{
    type : String,
    required : true,
  },
  productOldPrice :{
    type : String,
    required : true,
  },
  desc :{
    type : String,
    required : true,
  },
  rating :{
    type : String,
    required : true,
  },
  productImg :{
    type : String,
    required : true,
  },
  productImages :{
    type : Array,
    required : true
  },
  isActive: {   
    type : Boolean,
    required : true,
    default : true,
  },
  createdAt : {
    type : String,
    required : true,
    default : nDate
  },
  updatedAt : {
    type : String,
    required : true,
    default : nDate
  }

});

const productImgstorage = multer.diskStorage({
  destination : (req,file,cb)=>{
    if( file.fieldname == 'productImg'){
      cb (null, path.join(__dirname,'..',singleImg));
    }
    else{
      cb (null, path.join(__dirname,'..',multipalImg));
    }
  },
  filename : (req,file,cb)=>{
    cb (null, file.fieldname+'-'+Math.floor(Math.random() * 100))
  }
});

productSchema.statics.productImg = multer({storage : productImgstorage}).fields([{name : 'productImg', maxCount : 1},{name : 'productImages', maxCount : 5}]);
productSchema.statics.singleImg = singleImg;
productSchema.statics.multiImg = multipalImg;

const product = mongoose.model('product',productSchema);

module.exports = product;