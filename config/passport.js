
const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const admin = require('../model/admin');
const bcrypt = require('bcrypt')
const register = require('../model/frontPannel/register');

passport.use('admin',new passportLocal({
  usernameField : 'email',
}, async (email,password,done)=>{
  let data = await admin.findOne({email: email});

  if(data){
    let hashpass = await bcrypt.compare(password, data.password)

    if(!data || !hashpass){    
      return done(null,false);
    }
    else{
      return done(null,data);
    }
  }
}
));

passport.use('user',new passportLocal({
  usernameField : 'email',
}, async (email,password,done)=>{
  let data = await register.findOne({username: email});

  if(!data || password!=data.pass){    
    return done(null,false);
  }
  else{
    return done(null,data);
  }
}
));



passport.serializeUser((data,done)=>{
  return done(null,data.id);
});

passport.deserializeUser( async(id,done)=>{
  let record  = await admin.findById(id);

  if(record){
    return done(null,record);
  }
  else{
    let record = await register.findById(id);
    if(record){
      return done(null,record);
    }
    else{
      return done(null,false);
    }
  }
});


// Check Login
passport.CheckLogin = (req,res,next)=>{

  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect('/') 
  }
};

// data show
passport.getdata = (req,res,next)=>{
  
  if(req.isAuthenticated()){
    if(req.user.role == 'Admin'){
      res.locals.admin = req.user
    }
    else{
      res.locals.user = req.user
    }
  }
  next();
}

module.exports= passport;