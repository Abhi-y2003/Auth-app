const mongoose =require("mongoose");

require("dotenv").config();

exports.connect = ()=> { 
    mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    })
    .then( () => {console.log("Connection to database is successful")})
    .catch( (error) => {console.error(message.error)
    process.exit(1);
 });
}