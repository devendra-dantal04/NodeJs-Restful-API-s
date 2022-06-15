const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost:27017/wikiDB');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}), bodyParser.json());
app.set('view engine', 'ejs');
app.use(cookieParser());


app.use("/articles", require("./routes/articles"));


app.listen(3000,function(){
    console.log("Server Running On Port 3000");
})