/**
 * Created by jasmine on 11/26/2016.
 */
var express = require("express");
var mongoose = require("mongoose");
var body_parser=require("body-parser");
var cors= require("cors");
var mongodburi=process.env.MONGODB_URI || "mongodb://jasmine:cse5335@ds111188.mlab.com:11188/heroku_9kg97vhw";
mongoose.connect(mongodburi);

var data_schema=new mongoose.Schema({

    No : Number,
    Name : String,
    Pclass : String ,
    Age : String,
    Sex : String,
    Survived : Number,
    SexCode : Number

});
var data_collection = mongoose.model("collection",data_schema,"titanic");

var app=express();
app.use(cors());
app.use(body_parser.json());

var port =process.env.PORT || 3000

app.get("/",function(req,res){
    res.sendfile(__dirname+'/data.html')

})

app.get("/api/apidata",function (req,res){
    data_collection.find({},{"No":1,"_id":0},function(err,data){
        res.json(data)
    })
})

app.get("/api/apidata/:No",function (req,res) {
    data_collection.findOne({No: req.params.No}, {"_id": 0}, function (err, data) {
        res.json(data)
    })
})
app.listen(port)
