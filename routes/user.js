const express= require("express");
const router = express.Router();

const {login, signup, Auth} = require("../controller/Auth")


request.post("/login", login);
request.post("/signup", signup);

module.exports = router;