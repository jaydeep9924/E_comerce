const express = require('express');
const port = 8050;
const app = express();
const path = require('path');

app.use(express.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('asstes'));
app.use(express.static('asstes/frontPannel'));

const mongoose = require('mongoose')
const url = `mongodb+srv://jaydeepatel:Jaydeep123@cluster0.bscpzyc.mongodb.net/E-Commerce?retryWrites=true`;
mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then( () => {
    console.log('Connected to database')
  })
  .catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.use('/img/admin',express.static(path.join(__dirname,'img/admin')));
app.use('/img/category',express.static(path.join(__dirname,'img/category')));
app.use('/img/productsingelimg',express.static(path.join(__dirname,'img/productsingelimg')));
app.use('/img/productmultipalimg',express.static(path.join(__dirname,'img/productmultipalimg')));
app.use('/img/comment',express.static(path.join(__dirname,'img/comment')));

const passportLocal = require('./config/passport');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const message = require('./config/message');
const cookie = require('cookie');
const cookie_parser = require('cookie-parser');
app.use(cookie_parser());

app.use(session({
  name : 'E-Commerce Project',
  secret : 'code',
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 1000*60*60
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.getdata);
app.use(flash());
app.use(message.setFlash);
app.use('/', require('./router/adminRouter/admin'));
app.use('/user', require('./router/frontPannel/index'));

app.listen(port,(err)=>{
  if(err){ console.log(err); return false;} 

  console.log('Server is Connected on Port', port);
});