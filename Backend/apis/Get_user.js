const jwt = require('jsonwebtoken');   
const express = require('express')
const route = express.Router()  //router helps in putting all the endpoints here  
const user = require('../Models/user')
const fetch_user_id = require('../Middleware/Fetch_User_Id');
const { findById } = require('../Models/user');
route.post('/', fetch_user_id, async (res, req)=>{ //fetch_user is the middleware function exported from FetchUser.js this func. will act when this endpoint is hit before the func. next to it. This middleware helps in extracting the id of user from the authorization token of user
        
try {
    const UserId = req.user.id; //this we have fetched using middleware
    const user_data = await user.findById(UserId).select("-password")
   return res.send(user_data) //this query will first find that id on finding that id it selects all the feild except that password
} catch (error) {
    console.error(error.message)
   return res.status(400).send("can't find")
}
}) 
module.exports = route