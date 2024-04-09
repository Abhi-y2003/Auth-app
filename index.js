const express = require("express");

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 4000 ; 

app.use(express.json());

 
require("./config/database").connect();

//route importing and mounting 
const user = require("./routes/user");
app.use(user);


app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`)
})


app.get("/", (req,res)=>{
    res.send(`<h1>This is Home page BITCH </h1>`);
})