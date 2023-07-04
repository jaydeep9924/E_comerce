
const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/img/comment';
const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});

const commentSchema = mongoose.Schema({
  productId : {
    type : mongoose.Schema.Types.ObjectId,
    Ref : 'product',
    required : true,
  },
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  message : {
    type : String,
    required : true,
  },
  commentimg : {
    type : String,
    required : true,
  },
  isActive : {
    type : Boolean,
    required : true,
    default : true,
  },
  date :{
    type : String,
    required : true,
    default : nDate
  }
});

const imgstorage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb (null, path.join(__dirname,'../..',imgpath))
  },
  filename : (req,file,cb)=>{
    cb (null, file.filename+'-'+Date.now())
  }
});

commentSchema.statics.imguploader = multer({storage : imgstorage}).single('commentimg');
commentSchema.statics.imgfilename = imgpath;


const comment = mongoose.model('comment',commentSchema);

module.exports = comment;