const express = require("express");
const multer = require("multer");
const ejs = require('ejs');
const path = require("path");


//Set Storage engine
const storage = multer.diskStorage({
    destination : "./public/uploads/",
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//init upload
const upload = multer({
    storage : storage,
    limits : {fileSize : 1000000},
    fileFilter : function(req, file, cb){
        checkFileType(file,cb);
    }
}).single('my-img')



//Check File function
function checkFileType(file, cb){
    //allowed ext
    const filetypes = /jpeg|jpg|gif|png/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mine
    const mimetype = filetypes.test(file.mimetype.split('/')[1]);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb("Error : Images Only")
    }
}


//Init app
const app = express()

//EJS
app.set('view engine', 'ejs');

//Public Folder
app.use(express.static(__dirname+"/public"))

app.get("/", (req,res) => res.render('index'))

app.post('/upload', (req,res) =>{
    upload(req, res, (err)=>{
        if(err){
            res.render("index", {msg : err})
        }else{
            if(req.file === "undefined"){
                res.render("index", {msg : "No File is Selected"})
            }else{
                res.render("index", {msg : "File Uploaded.", file : `uploads/${req.file.filename}`})
            }
        }
    })
})

const port = 3000;


app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})

