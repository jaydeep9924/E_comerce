const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const filePath = '/img/admin';

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});

const adminSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  gender : {
    type : String,
    required : true,
  },
  hobby : {
    type : Array,
    required : true,
  },
  city : {
    type : String,
    required : true,
  },
  desc : {
    type : String,
    required : true,
  },
  admin_img :{
    type : String,
    required : true,
  },
  role :{
    type : String,
    required : true,
  },
  isActive: {   
    type : Boolean,
    required : true,
    default : true,
  },
  isLogin: {
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

const adminImgStoarge = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null, path.join(__dirname,'..',filePath))
  },
  filename : (req,file,cb)=>{
    cb(null, file.fieldname+'-'+Date.now())
  }
});

adminSchema.statics.adminImgName = multer({storage : adminImgStoarge}).single('admin_img');
adminSchema.statics.adminImgUploaded = filePath;

const admin = mongoose.model('admin',adminSchema);

module.exports = admin;
