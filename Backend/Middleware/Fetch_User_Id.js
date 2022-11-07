const jwt = require('jsonwebtoken');
const user = require('../Models/user')
require('dotenv').config()
//This function will get user id from auth-token passed in request header and pass the id to the request object.
const fetch_user_id = (req, res, next) =>       //this is middleware function which takes parameter next to execute the next func. 
{
  const token = req.header('auth-token')   //we will pass the token of the user in header of request whose name is auth-token
  if (token == null) {
    return res.status(401).json({ "Error": "Token is empty" })
  }
  try {
    const decoded_string = jwt.verify(token, process.env.JWTSECRET)
    // let ID = decoded_string.split(" ")
    // let idd = ID[1] 
    //return res.send(idd)
    req.id = decoded_string.user.id;
    
  } catch (error) {
   // console.error("Invalid User")
   return res.status(400).json({ "Error": "Can't get the user" })
  }
  next()
}
module.exports = fetch_user_id;