
const mongoose = require('mongoose');

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});


const registerschema = mongoose.Schema({
  username : {
    type : String,
    required : true
  },
  pass : {
    type : String,
    required : true
  },
  con_pass : {
    type : String,
    required : true
  },
  role :{
    type : String,
    required : true,
    default : 'user'
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
});

const register = mongoose.model('register',registerschema);

module.exports = register;