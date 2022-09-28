const express = require('express');
const fs = require('fs');
const path = require('path');
var cors = require('cors');
const spawn = require('child_process').spawn;


const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get(`/`,(req,res)=>{
    res.sendFile(__dirname+'/WEB/html/home.html');
});

app.get(`/manual.html`,(req,res)=>{
    res.sendFile(__dirname+'/WEB/html/manual.html');
});

app.get(`/info.html`,(req,res)=>{
    res.sendFile(__dirname+'/WEB/html/info.html');
});

app.get(`/monitoring.html`,(req,res)=>{
    res.sendFile(__dirname+'/WEB/html/monitoring.html');
});

app.listen(8000,()=>{
    console.log(`Server Started at port : ${8000}`);
});