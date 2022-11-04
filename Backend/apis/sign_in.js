const express = require('express')
const route = express.Router()
const { body, validationResult } = require('express-validator'); 
const jwt = require('jsonwebtoken')
const user = require('../Models/user')
require('dotenv').config()
const JWT_SECRET = "HELLOWORLD"
route.post('/', [
    body('email', 'Check your email').isEmail(),
    body('password', 'Invalid password').isLength({min: 5}).exists()
],
async (req, res) =>{
    //first the below constraints are checked before checking it in database
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    
const {email, password} = req.body
try {
    //check if it exist or not
    // let user_email = await user.findOne({email: email})

    // if(!user_email) return res.status(404).send({"error": "Incorrect data or first try signing in"})
    //After checking the presence of user_email in database we compare all the hashed password in the database and password associated with the email if found then return true else false

    //verifying the hashed password
    // let password_compare = await bcrypt.compare(password, user.password)  //user.password is undefined???????
    // if(!password_compare) return res.status(404).json({"error": "Incorrect data or first try signing in"})

    //if all the verfication are valid then we will take the data in payload part of token 
    const payload = {
            id: user.id
    }
    
    const token = jwt.sign(payload, process.env.JWTSECRET)
    return res.json({"Message":"Succesfully signed in","Authorization/JWT-Token": token})
    
}
 catch (error) {
   return res.status(400).send(error.message)
} 
}

)
module.exports = route