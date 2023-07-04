
const mongoose = require('mongoose');

const cartschema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "register",
    required : true
  },
  productId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "product",
    required : true
  },
  quantity : {
    type : String,
    required : true,
  },
});

const cart = mongoose.model('cart',cartschema);

module.exports = cart;