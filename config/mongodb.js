const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/E-Commerce');

const db = mongoose.connection;

db.once('open',(err)=>{
  if(err){
    console.log('DB is not Connected');
    console.log(err);
    return false;
  }
  console.log('DB is Connected');

});

module.exports = db