// Setup empty JS object to act as endpoint for all route
const data = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 3000;
const server = app.listen(port,listening);
// Callback to debug
function listening(){
    console.log(`running on localhost: ${port}`)
}
// Initialize all route with a callback function
app.get('/all',recieveInfo);
// Callback function to complete GET '/all'
function recieveInfo(req,res){
    res.send(data);
}

// Post Route
app.post('/add',postInfo);

function postInfo(req,res){
    data['date'] = req.body.date;
    data['temp'] = req.body.temp;
    data['content'] = req.body.content;
    res.send(data)
}
  