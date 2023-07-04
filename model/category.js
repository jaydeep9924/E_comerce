const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const filePath = '/img/category';

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});

const categorySchema = mongoose.Schema({
  categoryName : {
    type : String,
    required : true,
  },
  categoryImage : {
    type : String,
    required : true,
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

const categoryImgStoarge = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null, path.join(__dirname,'..',filePath))
  },
  filename : (req,file,cb)=>{
    cb(null, file.fieldname+'-'+Date.now())
  }
});

categorySchema.statics.categoryImgName = multer({storage : categoryImgStoarge}).single('categoryImage');
categorySchema.statics.categoryImgUploaded = filePath;

const category = mongoose.model('category',categorySchema);

module.exports = category;
