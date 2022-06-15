const express = require('express');
const Article = require("../models/article");
const routes = express.Router();

routes.route("/")
.get( (req,res) =>{
    Article.find((err, foundArticles) =>{
        if(err){
            res.status(400).send("Sorry No articles are here.");
        }

        res.cookie('article',"HEllo World",{ expires: new Date(Date.now() + 900000), httpOnly: true });
        res.send("Successfuly Get");
    })
    
})

.post((req,res)=>{
    
    const title = req.body.title;
    const content = req.body.content;
    // res.status(200).json({data:{title,content}});

    let article = new Article({
    title,content
    })
    article.save();
    
    
})

.delete((req,res)=>{
    Article.deleteMany((err)=>{
        if(!err){
            res.status(200).send("Successfuly Deleted");
        }
        res.send(err);
    })
});


routes.route("/:articleTitle")
.get((req,res)=>{
    
    Article.findOne({title : req.params.articleTitle}, (err,foundArticle)=>{
        if(!err){
            res.send(foundArticle);
        }else{
            res.send("No Such Article is Present.");
        }
    })
})

.put((req,res)=>{
    
    Article.updateOne(
        {title : req.params.articleTitle},
        {title : req.body.title,content:req.body.content},
        function(err){
            if(!err){
                res.send("Succesufuly Updated.");
            }else{
                res.send(err);
            }
        }
    )

})

.patch((req,res)=>{
    Article.findOneAndUpdate(
        {title: req.params.articleTitle},
        {$set : req.body},
        function(err){
            if(!err){
                res.send("Succesfuly Updated Selected article.");
            }else{
                res.send(err);
            }
        }
        )
})

.delete((req,res)=>{
    Article.findOneAndDelete(
        {title : req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Succesfuly Deleted The Article");
            }
        }
    )
})

module.exports = routes;