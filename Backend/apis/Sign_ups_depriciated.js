const express = require('express')
const route = express.Router()  //router helps in putting all the endpoints here  
const user = require('../models/user')
const { body, validationResult } = require('express-validator');   //we should know weather the data we are saving is in proper schma or not so we add middleware/checker which checks wheather data send by user is in valid form like for name number is not written so for this we use express-validator 
//const { json } = require('express');
//security modles i.e.middle wares
const bcrypt = require('bcryptjs');   //this module prvides function will is used to hash our password. It also comes with the concept of salts which add some more data to string before saving to provide extra protection
const jwt = require('jsonwebtoken');   //this module is used ex. if user enters/signup to our server it is assigned to a token provided by this module so that next time user will use this token along with its credentials to validate its identity more---> https://www.akana.com/blog/what-is-jwt#:~:text=JWT%2C%20or%20JSON%20Web%20Token%2C%20is%20an%20open,cannot%20be%20altered%20after%20the%20token%20is%20issued.
require('dotenv').config();


//endpoints/apis
route.post('/', [                        //post don't show the data send in url where as get shows since here we want to sign in which contain password so we have used post
  body('name', 'Invalid Name').isString(),
  body('password', 'Write suitable password').isLength({ min: 5 }),
  body('email', 'Incorrect Email').isEmail(),
  body('phone', 'Invalid Phone Number').isLength(10)
],
  async (req, res) => {

    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      //req.body contain the json file or any type of content send by the user as a request to server and the server can extract its content as req.body

      
 
      //we have to handle the redundancy of the data so for that we define a method which will check weather password and phone already exist or not 
      const user_password = await user.findOne({ password: req.body.password })   //find gives promise so await is written
      if(user_password) return res.send("Try with another password it is already reserved")

      //salting our password and Hashing our password using bycrpt and changing normal password to hashed password
     //  const hashed_pass = await bcrypt.hash(req.body.password, 10)     //this always generate a unique string for the same text to be hashed so more then one user using same plain text can store the password thats why i have not used hashing here 
     //  req.body.password = hashed_pass;     
     
      const use = new user(req.body)   //this will will create the document based on UserSchema and its content are req.body  or this can be done by create method
      const payload = {  //object  //insted of sending the user info. we will send id of user(id of user will be used in accessing the info)
        user:{
          id: use.id 
        }
      }
      const token = jwt.sign(payload, process.env.JWTSECRET);  //jwt takes user,JWT_SECRET data, jwt_secret(any random string to encrypt) to generate token to user
      // console.log(token) 


      //console.log(use);
      await use.save()
      return res.json({"Email":use.email, "Password":use.password,  "Authorization/JWT-Token": token })  //when the user come to again with this token we can fetch info. of user from the user id assigned to the token

    }
    
    catch (error) {
  return res.json({ "error": error.message })
}
  }
)


module.exports = route;