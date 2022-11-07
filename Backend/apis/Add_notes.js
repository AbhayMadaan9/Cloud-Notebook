//This endpoint will use the id of user fetched using middleware fetch_user_id and according to the id of user notes are fetched since in database Fetch_notes documents have notes wrt id of user id
const express = require('express')
const route = express.Router()  //router helps in putting all the endpoints here 
const fetch_user_id = require('../Middleware/Fetch_User_Id');
const user = require('../Models/user')
const notes = require('../Models/notes')
//const { body, validationResult } = require('express-validator');
route.post('/', fetch_user_id ,async(req, res)=>{
      //  const errors = validationResult(req);
     // if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      try {
        const { title, description} = req.body;
       const note = new notes({title, description, user: req.id})
       await note.save()
       res.json(note);
      } catch (error) {
        res.status(400).send(error.message)
      }
})
module.exports = route