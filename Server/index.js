let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let routes = require('./routes');
let app = express();
let cors = require('cors')

app.use(cors()) 
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/empverify',{
    useNewUrlParser:true
})
var db = mongoose.connection;

if(!db)
    console.log("DB connection error...");
else
    console.log("DB connected");

var port = process.env.PORT || 8000;

app.listen(port,function(){
    console.log('Running API on = '+ port);
});

app.use('/api',routes);
