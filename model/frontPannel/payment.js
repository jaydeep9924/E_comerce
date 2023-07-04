const mongoose = require('mongoose');

const paymentschema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  cum_name : {
    type : String,
    required : true,
  },
  coun : {
    type : String,
    required : true,
  },
  street : {
    type : String,
    required : true,
  },
  zip : {
    type : String,
    required : true,
  },
  town : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  phone : {
    type : Number,
    required : true,
  },
  totalpayment : {
    type : Number,
    required : true,
  },
  orderstatus : {
    type : String,
    required : true,
  },
  ordertime : {
    type : String,
    required : true,
  },
  user_id :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'register',
    required :true,
  }
});

const payment =  mongoose.model('payment',paymentschema);

module.exports = payment;