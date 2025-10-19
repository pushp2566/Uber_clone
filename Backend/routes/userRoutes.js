const express=require('express');
const router=express.Router();
const {body, validationResult}=require('express-validator');
const userController=require('../controllers/userController');
const authMiddleware=require('../middleware/auth.middleware');

router.post('/register',[body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').notEmpty().withMessage('Firstname is required'),
    body('fullname.lastname').notEmpty().withMessage('Lastname is required')
    
], userController.register);

router.post('/login',[body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.login);
router.get('/profile', authMiddleware.authUser, userController.getProfile);
router.get('/logout', authMiddleware.authUser,userController.logout);

module.exports=router;
