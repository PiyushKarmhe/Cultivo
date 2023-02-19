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

app.get(`/know.html`,(req,res)=>{
    res.sendFile(__dirname+'/WEB/html/know.html');
});

app.get(`/team.html`,(req,res)=>{
    res.sendFile(__dirname+'/WEB/html/team.html');
});

app.post(`/manual.html/pred`,(req,res)=>{

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "OPTIONS,POST,GET",
        'Access-Control-Allow-Origin': "*"
    });

    const data = req.body

    let stringifiedData = JSON.stringify(data);
    console.log(stringifiedData);

    const py = spawn('python', ['PYTHON/model.py', stringifiedData]);

    resultString = '';
    py.stdout.on('data', function (stdData) {
        resultString += stdData.toString();
    });

    py.stdout.on('end', function () {
        console.log(resultString);
        return res.send(resultString);
    });
});

app.post(`/manual.html/bestcrop`,(req,res)=>{

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "OPTIONS,POST,GET",
        'Access-Control-Allow-Origin': "*"
    });


    const data = req.body

    let stringifiedData = JSON.stringify(data);
    console.log(stringifiedData);

    const py = spawn('python', ['PYTHON/crop-details.py', stringifiedData]);

    resultString = '';
    py.stdout.on('data', function (stdData) {
        resultString += stdData.toString();
    });

    py.stdout.on('end', function () {
        console.log(resultString);
        return res.send(resultString);
    });
});

app.post(`/manual.html/test`,(req,res)=>{

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "OPTIONS,POST,GET",
        'Access-Control-Allow-Origin': "*"
    });

    // const data = {
    //     "params" : [30,28,30,32,52,5,98]
    // }

    const data = req.body

    let stringifiedData = JSON.stringify(data);
    console.log(stringifiedData);

    const py = spawn('python', ['PYTHON/test.py', stringifiedData]);

    resultString = '';
    py.stdout.on('data', function (stdData) {
        resultString += stdData.toString();
        // console.log(resultString);
    });

    py.stdout.on('end', function () {
        console.log(resultString);
        return res.send(resultString);
    });
});
app.listen(8000,()=>{
    console.log(`Server Started at port : ${8000}`);
});