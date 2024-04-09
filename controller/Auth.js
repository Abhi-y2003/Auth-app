const bcrypt = require("bcrypt");
const User = require("../models/user")

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