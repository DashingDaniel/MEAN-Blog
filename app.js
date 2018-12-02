const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const routes = require('./routes/route');


const port = 3000;

// Middleware config
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true }));
app.use(cors());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//  the routes files are appended with /api so that it allows us to add proxy in the future.
app.use('/api',routes);
app.listen(port,()=>{
    console.log('Magic happens at port ',port)
});