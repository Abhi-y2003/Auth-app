const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler

exports.signup = async (req, res)=>{
    try {
        //get input data
        const {name,email,password,role}=req.body; 
        
        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            });
        }
        
        //securing password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);

        }
         catch(error){
            return res.status(500).json({
                success:false,
                message:"error in hashing password"
            })
        }


        //creating entry for user
        const user = await User.create({
            name, email, password:hashedPassword, role
        })


        return res.status(200).json({
            success:true,
            message:"user created successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
                success:false,
                message:"user is not register"
            })
       
    }
}


exports.login = async(req,res) =>{
    try {
        
        //fetching Data
        const{email,password}= req.body;

        //validation on email and password agar data nhi pada hai to
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all the details"
            })
        }

        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Please Signup"
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        //verify password and generate a jwt token
        if(await bcrypt.compare(password, user.password) ){
            //password is matched

            //a token is created for the user for autherisation
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"2h"});

            // a new field named token is created in user
            user = user.toObject()
            user.token = token;

            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ),
                httpOnly:true,

            }
            
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"user logged in successfully",
            });

        }
        else{
            //password do not match 
            return res.status(403).json({
                success:false,
                message:"password do not match"
            })
        }




    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            success:false,
            message:"user Login problem"
        })
    }
}