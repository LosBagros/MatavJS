const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(fileUpload());

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/save", (req,res)=>{
    res.send(req.body)
});

app.post("/saveImage", (req,res)=>{
    res.send(req.files)
});

app.listen(3000);