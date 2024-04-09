const jwt = require("jsonwebtoken");

require("dotenv").config();


//auth is using here for authentication and other two isStudnet and isAdmin is using for autherisation 

exports.auth = (req,res, next) =>{

    try {
        //extracting jwt token
        const token = req.body.token;

        if(!token){
            return res.status(500).json({
                success:false,
                message:"no token"
            })
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user= decode;

        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"

            })

            
        }
        //by using next we forward to the next middleware after auth
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"something went wrong in verifying the token"

        })
        
    }
}

exports.isStudent = (req,res, next)=>{
    try {

        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"You are not student"
            })
        }
        next();
        
    } catch (error) {

        return res.status(401).json({
            success:false,
            message:"isStudnet not working"
        })
    }
}


exports.isAdmin = (req,res, next)=>{
    try {

        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"You are not student"
            })
        }
        next();
        
    } catch (error) {

        return res.status(401).json({
            success:false,
            message:"isAdmin not working"
        })
    }
}
