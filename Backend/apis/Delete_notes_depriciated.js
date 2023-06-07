//This endpoint will use the id of user fetched using middleware fetch_user_id and according to the id of user notes are fetched since in database Fetch_notes documents have notes wrt id of user id
const express = require('express')
const route = express.Router()  //router helps in putting all the endpoints here 
const fetch_user_id = require('../middleware/Fetch_User_Id');
const notes = require('../Models/notes')

route.delete('/:id', fetch_user_id ,async(req, res)=>{      //in Uri we pass the object id of the note so that we can update that particular note  
    try {
        const find_note = await notes.findById(req.params.id)
        if(!find_note) return res.send("Empty data")  
        //check if the user is valid or not(extra authentication)
        if(find_note.user.toString() != req.id) //not valid user.
        {
            return res.status(400).send("Invalid User")
        }
        //valid user so delete the note
        const delete_note = await notes.findOneAndDelete(req.params.id)
        res.json( {"Deleted Note": find_note})
       } catch (error) {
        res.status(401).send(error.message)
       }
    
})
module.exports = route