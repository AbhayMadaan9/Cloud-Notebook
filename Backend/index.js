const mongodb = require('./database_connection.js')
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())    //this is a middleware this helps in sending the json content to the server(i.e. given the request containing json content to server)



//Endpoints/Api's (we will store our end points in routes/API'S for that we use router of express)

app.use('/SignUp',require('./apis/Sign_up')) //when url is /sign it will start the function of ./apis/sign_in 
app.use('/SignIn',require('./apis/Sign_in')) //when url is /sign it will start the function of ./apis/sign_in 



//Listening the server
app.listen(port, () => {
  console.log(`Server is started at 127.0.0.1:3000`)
})