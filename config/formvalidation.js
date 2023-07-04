const { check,sanitizeBody } = require('express-validator');

const admin = require('../model/admin');
const { changepass } = require('../controller/adminController/admin');

module.exports.resetpassword =[


   check('npass').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
  .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),

  // confirm password validation
  check('conpass').custom((value, { req }) => {
       if (value !== req.body.npass) {
          throw new Error('Password Confirmation does not match password');
       }
        return true;
   })
]

module.exports.password =[

     check('cpass').trim().notEmpty().withMessage('Enter Current Password'),

   check('newpass').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
  .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),

  // confirm password validation
  check('conpass').custom((value, { req }) => {
       if (value !== req.body.newpass) {
          throw new Error('Password Confirmation does not match password');
       }
        return true;
   })
]

module.exports.form=[

     // images
     check('admin_img').custom((value, { req }) => {
          if (!req.file) {
                throw new Error('Select Image');
           }
           return true;
     }),

     // description
     check('desc').trim().notEmpty().withMessage('Enter Description'),

     // gender
     check('gender').custom((value, { req }) => {
          if (!req.body.gender) {
                throw new Error('Select Gender');
           }
           return true;
     }),
     // hobby
     check('hobby').custom((value, { req }) => {
          if (!req.body.hobby) {
                throw new Error('Select Hobby');
           }
           return true;
     }),
     // city
     check('city').custom((value, { req }) => {
          if (!req.body.city) {
                throw new Error('Select City');
           }
           return true;
     }),



  // Name validation
  check('name').trim().notEmpty().withMessage('Name required')
  .isLength({ min: 3 }).withMessage('Enter Proper Name')
  .matches(/^[a-zA-Z ]*$/).withMessage('Enter Correct Or Valid Name'),

//  // last Name validation
//   check('lastName').notEmpty().withMessage('Last Name required')
//   .isLength({ min: 3 }).withMessage('Enter Proper Name')
//   .matches(/^[a-zA-Z ]*$/).withMessage('Enter Correct Or Valid Name'),

  // email address validation
  check('email').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email'),

  // password validation
  check('password').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
  .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),
  
//   // confirm password validation
//   check('confirmPassword').custom((value, { req }) => {
//        if (value !== req.body.password) {
//           throw new Error('Password Confirmation does not match password');
//        }
//         return true;
//    })
]

module.exports.categoryForm = [ 
     // images
     check('categoryImage').custom((value, { req }) => {
          if (!req.file) {
                throw new Error('Select Image');
           }
           return true;
     }),

     check('categoryName').trim().notEmpty().withMessage('Enter Category Name')
     .isLength({ min: 3 }).withMessage('Enter Valid Category Name')
]

module.exports.subcategoryForm = [ 
     
     check('categoryId').custom((value, { req }) => {
          if (!req.body.categoryId) {
                throw new Error('Select Category');
           }
           return true;
     }),

     check('subcategoryName').trim().notEmpty().withMessage('Enter Subcategory Name')
     .isLength({ min: 3 }).withMessage('Enter Valid Subcategory Name')
]

module.exports.extracategoryForm = [ 
     
     check('categoryId').custom((value, { req }) => {
          if (!req.body.categoryId) {
                throw new Error('Select Category');
           }
           return true;
     }),

     check('subcategoryId').custom((value, { req }) => {
          if (!req.body.subcategoryId) {
                throw new Error('Select Subcategory');
           }
           return true;
     }),

     check('extracategoryName').trim().notEmpty().withMessage('Enter Extracategory Name')
     .isLength({ min: 3 }).withMessage('Enter Valid Extracategory Name')
]

module.exports.type = [ 
     
     check('categoryId').custom((value, { req }) => {
          if (!req.body.categoryId) {
                throw new Error('Select Category');
           }
           return true;
     }),

     check('subcategoryId').custom((value, { req }) => {
          if (!req.body.subcategoryId) {
                throw new Error('Select Subcategory');
           }
           return true;
     }),

     check('extracategoryId').custom((value, { req }) => {
          if (!req.body.extracategoryId) {
                throw new Error('Select Extracategory');
           }
           return true;
     }),

     check('typename').trim().notEmpty().withMessage('Enter Type Name')
     .isLength({ min: 3 }).withMessage('Enter Valid Type Name'),
]


module.exports.brand = [ 
     
     check('categoryId').custom((value, { req }) => {
          if (!req.body.categoryId) {
                throw new Error('Select Category');
           }
           return true;
     }),

     check('subcategoryId').custom((value, { req }) => {
          if (!req.body.subcategoryId) {
                throw new Error('Select Subcategory');
           }
           return true;
     }),

     check('extracategoryId').custom((value, { req }) => {
          if (!req.body.extracategoryId) {
                throw new Error('Select Extracategory');
           }
           return true;
     }),

     check('brandname').trim().notEmpty().withMessage('Enter Brand Name')
     .isLength({ min: 3 }).withMessage('Enter Valid Brand Name')
]

module.exports.product = [ 
     
     check('categoryId').custom((value, { req }) => {
          if (!req.body.categoryId) {
                throw new Error('Select Category');
           }
           return true;
     }),

     check('subcategoryId').custom((value, { req }) => {
          if (!req.body.subcategoryId) {
                throw new Error('Select Subcategory');
           }
           return true;
     }),

     check('extracategoryId').custom((value, { req }) => {
          if (!req.body.extracategoryId) {
                throw new Error('Select Extracategory');
           }
           return true;
     }),

     check('typeId').custom((value, { req }) => {
          if (!req.body.typeId) {
                throw new Error('Select Type');
           }
           return true;
     }),

     check('brandId').custom((value, { req }) => {
          if (!req.body.brandId) {
                throw new Error('Select Brand');
           }
           return true;
     }),

     check('productName').trim().notEmpty().withMessage('Enter Product Name')
     .isLength({ min: 3 }).withMessage('Enter Valid Product Name'),

     check('productPrice').trim().notEmpty().withMessage('Enter Product Price'),
     check('productOldPrice').trim().notEmpty().withMessage('Enter Product Old Price'),

     check('desc').trim().notEmpty().withMessage('Enter Description')
     .isLength({ min: 10 }).withMessage('Enter Valid Description'),

     check('rating').custom((value, { req }) => {
          if (!req.body.rating) {
                throw new Error('Enter Rating');
           }
           return true;
     }),

     check('productImg').custom((value, { req }) => {
          if (!req.files.productImg) {
                throw new Error('Select Image');
           }
           return true;
     }),

     check('productImages').custom((value, { req }) => {
          if (!req.files.productImages) {
                throw new Error('Select Multipal Images');
           }
           return true;
     }),

];
