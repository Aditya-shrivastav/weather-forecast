// Setup empty JS object to act as endpoint for all route
let data = {};
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
app.use(express.static('dist'));
// Spin up the server

// Initialize all route with a callback function
app.get('/',function(req,res){
    res.sendFile('dist/index.html')
})

// Post Route
app.post('/add',addInfo)

function addInfo(req,res){
    data['city'] = req.body.city
    data['min_temp'] = req.body.min_temp
    data['max_temp'] = req.body.max_temp
    data['days'] = req.body.days
    data['date'] = req.body.date
    data['description'] = req.body.description
    res.send(data);
}

const port = 3000;
const server = app.listen(port,listening);
// Callback to debug
function listening(){
    console.log(`running on localhost: ${port}`)
}