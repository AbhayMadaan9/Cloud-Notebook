//This endpoint will use the id of user fetched using middleware fetch_user_id and according to the id of user notes are fetched since in database Fetch_notes documents have notes wrt id of user id
const express = require('express')
const route = express.Router()  //router helps in putting all the endpoints here 
const fetch_user_id = require('../middleware/Fetch_User_Id');
const notes = require('../Models/notes')

route.put('/:id', fetch_user_id ,async(req, res)=>{      //in Uri we pass the object id of the note so that we can update that particular note  
    try {
    const {title, description, tag} = req.body;
    const newNote = {}; //object which contain the new data to be replaced
   if(title) newNote.title = title
   if(description) newNote.description = description
   if(tag) newNote.tag = tag;
    //find the Note which is to be updated
    let is_note_present = await notes.findById(req.params.id)
      if(!is_note_present) return res.send("Empty data") 
    //check if the user is valid or not(extra authentication)
    if(is_note_present.user.toString() != req.id) //not valid user.
    {
        return res.status(400).send("Invalid User")
    }
    //valid user so update note
    let updated_note = await notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}) 
    return res.send(updated_note);
    } catch (error) {
        res.status(406).send(error.message);
    }
    
})
module.exports = route