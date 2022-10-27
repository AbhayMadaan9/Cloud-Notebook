const express = require('express')
const route = express.Router()  //router helps in putting all the endpoints here  
const user = require('../Models/user')
const { body, validationResult } = require('express-validator');   //we should know weather the data we are saving is in proper schma or not so we add middleware/checker which checks wheather data send by user is in valid form like for name number is not written so for this we use express-validator 
//const { json } = require('express');
//security modles i.e.middle wares
const bcrypt = require('bcryptjs');   //this module prvides function will is used to hash our password. It also comes with the concept of salts which add some more data to string before saving to provide extra protection
const jwt = require('jsonwebtoken');   //this module is used ex. if user enters/signup to our server it is assigned to a token provided by this module so that next time user will use this token along with its credentials to validate its identity more---> https://www.akana.com/blog/what-is-jwt#:~:text=JWT%2C%20or%20JSON%20Web%20Token%2C%20is%20an%20open,cannot%20be%20altered%20after%20the%20token%20is%20issued.
//const { Router } = require('express'); 

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

      // res.send("This is sign in page url")
      //req.body contain the json file or any type of content send by the user as a request to server and the server can extract its content as req.body
      else { //nested try catch

        //we have to handle the redundancy of the data so for that we define a method which will check weather password and phone already exist or not 

        // async function is_valid_password (password){ 
        //   try {
        //     const user_password = await user.findone({password: req.body.password})   //find gives promise so await is written
        //     if(user_password) return false
        //     else return true

        //   } catch (error) {
        //     console.log('error while checking the copy of data in database', error.message)
        //     return false
        //   }
        // }
        //   const new_user = await is_valid_password(req.body.password)
        //   if(new_user) return res.json({"message": "Password alredy exists. Try another passwod "})
        //   else
        //   {
 
        //salting our password and Hashing our password using bycrpt

    await  bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err)  console.log(err.message)
        else {req.body.password = hash;}
    });


        const use = new user(req.body)   //this will will create the document based on UserSchema and its content are req.body  or this can be done by create method
        const data = {  //object  //insted of sending the user info. we will send id of user(id of user will be used in accessing the info)
          user:
          {
            id: use.id
          }
        }
        const JWT_SECRET = "HELLOWORLD"
        const token = jwt.sign(data, JWT_SECRET);  //jwt takes user data, jwt_seceret(any random string to encrypt) to generate token to user
        console.log(token)

        console.log(use);
        await use.save()
      return res.json({ "your_unique_identinty": token })  //when the user come to again with this token we can fetch info. of user from the user id assigned to the token
        
      }
    } 
    catch (error) {
     return res.json({ "error": error.message })
    }
  }
)


module.exports = route;