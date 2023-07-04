
const mongoose = require('mongoose');

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});


const subcategorySchema = mongoose.Schema({
  categoryId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "category",
    required : true
  },
  subcategoryName : {
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

const subcategory = mongoose.model('subcategory',subcategorySchema);

module.exports = subcategory;