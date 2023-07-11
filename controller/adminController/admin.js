
const admin = require('../../model/admin');
const nodemailer =  require('nodemailer');
const bcrypt = require('bcrypt');

const { validationResult, matchedData } = require('express-validator');

module.exports.dashboard = async (req,res)=>{
  if(req.isAuthenticated()){
    res.render('admin/dashboard')
  }
  else{
    return res.redirect('/loginPage');
  }
};
module.exports.profile = (req,res)=>{
  res.render('admin/profile');
};
module.exports.loginPage = (req,res)=>{
  res.render('admin/login')
};
module.exports.login = (req,res)=>{
  req.flash('success', "Login Successfully");
  res.redirect('/');
};
module.exports.checkbox = async (req,res)=>{

  let check = req.body.checkboxid;
    for(var i=0; i<check.length; i++){

      let data = await admin.findById(check[i]);
      if(data.isActive === true){
        await admin.findByIdAndUpdate(check[i],{
          isActive : false,
        });
        req.flash('error', "Deactive All");
      }
      else{
        await admin.findByIdAndUpdate(check[i],{
          isActive : true,
        });
        req.flash('success', "Active All");
      }
    }
    res.redirect('back')
};
module.exports.adminForm = async (req,res)=>{
  res.render('admin/form/admin');
};
module.exports.getadminData = async (req,res)=>{ 
      var img= '';
      if(req.file){
        img = admin.adminImgUploaded+'/'+req.file.filename;
      }
      req.body.admin_img = img;
      req.body.role = 'Admin';
      const hashpass = await bcrypt.hash(req.body.password,10)
      req.body.password = hashpass;

      let data = await admin(req.body);
      data.save();
      if(data){ 
        req.flash('success', "Admin Data Added Successfully");
        res.redirect('/admin');
      }
      else{
        req.flash('error', "Something Wrong");
        res.redirect('/admin');
      }

};

module.exports.adminData = async (req,res)=>{

  if(req.query.active){
    await admin.findByIdAndUpdate(req.query.active,{
      isActive : false,
    });
    req.flash('success', "Active");

  };

  if(req.query.deactive){
    await admin.findByIdAndUpdate(req.query.deactive,{
      isActive : true,
    });
    req.flash('error', "Deactive");

  };

  let search = '';
  if(req.query.search){
    search = req.query.search;
  };

  let page = 1;
  if(req.query.page){
    page = req.query.page;
  };
  let limit = 3;

  let data = await admin.find({
    $or :[
      {name : {$regex : search, $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .exec();

  let count = await admin.find({
    $or :[
      {name : {$regex : search , $options : 'i'}}
    ]
  })
  .countDocuments();

  return res.render('admin/table/adminData',{
    adminData : data,
    totalPage : Math.ceil(count/limit),
    searchData : search,
  });
};

module.exports.deleteAdmin = async (req,res)=>{
  let data = await admin.findByIdAndDelete(req.params.id);
  req.flash('error', "Admin Deleted Successfully");
  res.redirect('back');
};

module.exports.password = (req,res)=>{ res.render('admin/password'); }

module.exports.changepass = async (req,res)=>{

  const errors= validationResult(req);
  if(!errors.isEmpty()){
    req.flash('error', "Fill Proper Detalis");
    var errMsg= errors.mapped();
    var inputData = matchedData(req);  
    res.render('admin/password', {errors:errMsg, inputData:inputData});  
  }
  else{
    var inputData = matchedData(req); 
    let data = await req.user;
    let hashpass = await bcrypt.compare(req.body.cpass,data.password);
  
    if(hashpass){
      if(req.body.cpass != req.body.newpass){
        if(req.body.newpass === req.body.conpass){
          let check = await admin.findById(data._id);
          if(check){
            let pass = await bcrypt.hash(req.body.newpass,10);
            await admin.findByIdAndUpdate(check.id,{
              password : pass
            });
      
            req.flash('success', "Password Change Successfully");
            return res.redirect('/logout')
          }
          else{
            req.flash('error', "Something Wrong");
            res.redirect('/password');
          }
        }
        else{
          req.flash('error', "Enter Same Password");
          res.redirect('/password');
        }
      }
      else{
        req.flash('error', "Enter New Password");
        res.redirect('/password');
      }
    }
    else{
      req.flash('error', "Incorrect Password");
      res.redirect('/password');
    }
  }
};

module.exports.checkemail = async (req,res)=>{

  let check = await admin.findOne({email : req.body.email});

  if(check){

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "04d1f7d73a7dca",
        pass: "db3478ca96c20a"
      }
    });

    var otp = Math.ceil(Math.random()*1000);
    res.cookie('otp',otp),
    res.cookie('email',req.body.email)

    let info = await transport.sendMail({
      from: 'jaydeepatel9924@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "Otp For Reset Password", // plain text body
      html: `<b> otp :${otp} </b>`, // html body
    });
    req.flash('success','Otp Send Successfully');
    return res.redirect('/otp');

  }
  else{
    req.flash('error','Email not Found');
    return res.redirect('back');
  }

};

module.exports.otp = async (req,res)=>{

  if(req.body.otp == req.cookies.otp){
    return res.redirect('/resetpasspage');
  }
  else{
    req.flash('error','Otp is Wrong');
    return res.redirect('/otp');
  }

}

module.exports.resetpassword = async (req,res)=>{

  const errors= validationResult(req);
  if(!errors.isEmpty()){
    req.flash('error', "Fill Proper Detalis");
    var errMsg= errors.mapped();
    var inputData = matchedData(req);  
    res.render('admin/resetpassword', {errors:errMsg, inputData:inputData});  
  }
  else{
    var inputData = matchedData(req); 

    if(req.body.npass === req.body.conpass){
      let mail = await admin.findOne({email : req.cookies.email});
      if(mail){
        let check = await admin.findById(mail.id);
        if(check){
          let pass = await bcrypt.hash(req.body.npass,10);
          let change = await admin.findByIdAndUpdate(check.id,{password : pass});
          if(change){
            req.flash('success', 'Password Change Succesfully');
            return res.redirect('/');
          }
          else{
            req.flash('error', 'Password Not Change');
            return res.redirect('/resetpasspage');
          }
        }
        else{
          req.flash('error', 'Something Wrong');
          return res.redirect('/resetpasspage');
        }
      }
      else{
        req.flash('error', 'Email Not Found');
        return res.redirect('/resetpasspage');
      }
    }
    else{
      req.flash('error', 'Enter Same Password');
      return res.redirect('/resetpasspage');
    }
  }
};