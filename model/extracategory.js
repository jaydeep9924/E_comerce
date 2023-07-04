
const mongoose = require('mongoose');

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});


const extracategorySchema = mongoose.Schema({
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
  extracategoryName : {
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

const extracategory = mongoose.model('extracategory',extracategorySchema);

module.exports = extracategory;