const jwt = require("jsonwebtoken");
const asyncHandler= require('express-async-handler');
const User = require('./../models/userModel');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: "90d"
    });
}


exports.signup = asyncHandler(async(req,res)=>{
    const {firstName,lastName,role,email,password} = req.body;
    if(!firstName || !lastName || !email || !password || !role){
        res.status(400);
        throw new Error("Please enter all details");
    }

    const user = await User.findOne({email});
    if(user){
        res.status(400);
        throw new Error("Account already exists. Please signIn");
    }

    const newUser = await User.create({
        firstName,lastName,role,email,password
    });

    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    }
    else{
        res.status(400);
        throw new Error("failed to sign up")
    }
});


exports.login = asyncHandler(async(req,res)=>{
    console.log("hi");
        const { email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user);
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                firstName:user.firstName,
                lastName: user.lastName,
                email: user.email,
                role:user.role,
                token: generateToken(user._id)
            })
        } 
            else{
                res.status(401);
                throw new Error("Invalid email or password");
            }
        }
)
