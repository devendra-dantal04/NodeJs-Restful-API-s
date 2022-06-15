const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const articleSchema = new Schema({
    title : {type : String, required : true},
    content : {type : String, required : true},
})


const Article = mongoose.model('article', articleSchema);

module.exports =  Article;