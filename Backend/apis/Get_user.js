const jwt = require('jsonwebtoken');   
const route = express.Router()  //router helps in putting all the endpoints here  
const user = require('../Models/user')

route.post('/', fetch_user, async (res, req)=>{ //fetch_user is the middleware function exported from FetchUser.js this func. will act when this endpoint is hit before the func. next to it
    
})