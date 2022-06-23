const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lalit123",
    database : "nodejs"
});

// connecting to database
// connection.connect(function(error){
//     if(error) throw error
//     else console.log("Connected to the database successfully!")
// })

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/index.html");
})

app.post("/", encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username, password], function(error, results, fields){
       if(results.length > 0){
        res.redirect("/welcome")
       }else{
            res.redirect("/")
       }
       res.end();
    })
})

// Login success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})

// set app port
app.listen(8000,()=>{
    console.log("connected successfully!")
})