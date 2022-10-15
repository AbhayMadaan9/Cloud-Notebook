const express = require('express')
const route = express.Router()  //router helps in putting all the endpoints here  
const  user = require('../Models/User') 
//endpoints/apis
route.post('/', (req, res)=>{      //post don't show the data send in url where as get shows since here we want to sign in which contain password so we have used post
    res.send("This is sign in page url")
  //  console.log(req.body)     //req.body contain the json file or any type of content send by the user as a request to server and the server can extract its content as req.body
  const use = user(req.body)   //this will will create the document based on UserSchema and its content are req.body
  use.save()
})


module.exports = route