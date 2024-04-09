const express= require("express");
const router = express.Router();

const {login, signup, Auth} = require("../controller/Auth")
const {auth, isStudent, isAdmin} = require("../mddlewares/auth")


router.post("/login", login);
router.post("/signup", signup);

//protected routes 
router.get("/student", auth, isStudent, (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to protected route for students"
    })
})

router.get("/admin", auth, isAdmin, (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to protected route for Admin"
    })
})

module.exports = router;