
const mongoose = require('mongoose');

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});


const typeschema = mongoose.Schema({
  categoryId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "category",
    required : true
  },
  subcategoryId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "subcategory",
    required : true
  },
  extracategoryId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "extracategory",
    required : true
  },
  typename : {
    type : String,
    required : true
  },
  isActive : {
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

const type = mongoose.model('type',typeschema);

module.exports = type;