const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(fileUpload());
app.use("/img", express.static("img"));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/save", (req,res)=>{
    res.send(req.body);
});

app.post("/saveImage", (req,res)=>{
    if(req.files != null && req.files.obrazek != null) {
        req.files.obrazek.mv("img/" + Date.now() + req.files.obrazek.name);
        res.send("obrazek ulozen");
    } else {
        res.send("skill issue");
    }
});

app.get("/showImages", (req,res)=>{
    // nacist vsechny obrzky ze slozky (fs) -> projdete vsechny obrazky a pro kazdy vytvrice img 
    // tag a do src vlozit cestu k obrazku
    // static files
    // fs.readdir -> vraci pole s jmeny souboru
    const fs = require("fs")
    const imgDir = "img/"
    fs.readdir(imgDir, (err,files)=>{
        if(err){
            console.log(err)
        } else {
            let html = ""
            files.forEach(file=>{
                html += `<img src="${imgDir + file}" width="400px">`
            })
            res.send(html)
        }
    })
});

app.listen(3000);