var express= require("express");
var cors= require("cors")
var bodyParser= require("body-parser")
const mongoose= require('mongoose');
var jwt= require("jsonwebtoken");

var port= process.env.PORT || 3000

const config = require("./database/db");

var app= express()

//Database Connect
mongoose.connect(config.database);
// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ config.database);
});
// On error
mongoose.connection.on('error', (err) => {
    console.log('database error '+ err);
});

//Cors Middleware
app.use(cors())

app.use('/uploads', express.static('uploads'));

//Body-Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));


//Routes
var Users= require("./routes/Users")
const advertisementRoutes = require('./routes/advertisements');


app.use("/users",Users)
app.use("/advertisements",advertisementRoutes);

// Start Server
app.listen(port,function(){
    console.log("Server is running on port " +port)
})
