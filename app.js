var express = require("express");
var url = require('url-parse');
var querystring = require('querystring');
var app = express();
var router = express.Router();
var path = __dirname + '/views/'; // this folder should contain your html files.

app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("images"));
app.use(express.static("fonts"));
app.use(express.static("views"));


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/patientCOVID";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("patientCOVID");
  dbo.createCollection("patient", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  
  });

});
router.get("/",function(req,res){
  res.sendFile(path + "index.html");

});
router.get("/questionnaire",function(req,res){
  res.sendFile(path + "Quesstionnaire.html");

});
router.get("/index",function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/index_A",function(req,res){
  res.sendFile(path + "Admin.html");

});
app.get('/time',function(req,res){
var params = req.query;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("patientCOVID");
    var myobj = { identifiant: params.identif, priorite: params.prio,codePostal:params.codePos,age:params.age,dateTest:params.dateTest };
  dbo.collection("patient").insertOne(myobj, function(err, res) {
	 console.log('*****************************************'+res.insertedCount);
    if (err) throw err;
 
    console.log('*****************************************');
    db.close();
  });
});

   
   
});
app.get("/records",function(req,res){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("patientCOVID");
  dbo.collection("patient").find({}).toArray(function(err, result) {
	  res.send(result);
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

});

app.use("/questionnaire",router);
app.use("/index",router);
app.use("/time",router);
app.use("/records",router);

app.use("/",router);








app.listen(3000,function(){
  console.log("Live at Port 3000");
});