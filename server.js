var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'accept');
    next();
});
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/project', express.static(path.join(__dirname, 'project')));
app.use('/employee', express.static(path.join(__dirname, 'employee')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/',function (req,res) {
    res.sendFile(__dirname+"/client"+"/index.html");
});

app.post('/',function (req,res) {
    res.json({"message":"post method is found"})
});
app.listen(3001,function () {
    console.log("server in running on port : 3001");
});