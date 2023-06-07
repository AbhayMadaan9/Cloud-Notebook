//This endpoint will use the id of user fetched using middleware fetch_user_id and according to the id of user notes are fetched since in database Fetch_notes documents have notes wrt id of user id
const express = require('express')
const route = express.Router()  //router helps in putting all the endpoints here 
const fetch_user_id = require('../middleware/Fetch_User_Id');
//const user = require('../Models/user')
const notes = require('../Models/notes')
route.get('/', fetch_user_id ,async(req, res)=>{
    try {
            const is_note = await notes.find({user: req.id})
             return res.json({is_note})
    } catch (error) {
        res.send(error.message);
    }


})
module.exports = route