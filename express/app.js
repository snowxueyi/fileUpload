var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer=require('multer');
var fs=require("fs");


var routes = require('./routes/index');
var users = require('./routes/users');
var upload=multer( { dest: '../public/images/uploads/' } );
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public/images/uploads'), 
//   {
//      maxAge: 0, 
//      etag:false,
//      lastModified:false
//   }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{
  // maxAge:0,
  etag:false,
  // lastModified:false
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/users', users);
app.get("/",function(req,res){
  // res.writeHead(200,{
  //   "Cache-Control":"no-cache"
  // });   
  res.render("index",{});
});
// handle the file post resquest
app.post('/post',upload.single('file'),function(req,res,next){
  // console.log(req.body.file.length);
  // var data=JSON.parse(req.body);
  // console.log(req.body.file[0]);
  for(var i in  req.body.file){
    console.log(i);
    console.log(req.body.file[i].length);
  }
  // var data
  // var base64Data =data.replace(/^data:image\/\w+;base64,/, "");
  // var dataBuffer = new Buffer(base64Data, 'base64');
  // fs.writeFile("../public/images/uploads/out.jpg", dataBuffer, function(err) {
  //   if(err){
  //     res.send(err);
  //   }else{
  //     res.send("保存成功！");
  //   }
  // });
  // console.log(req.file);
  // res.redirect("/");
});
app.post("/pic",function(req,res){
  // var data=JOSN.parse(req.body);
  var data=req.body.img.data;
  console.log(typeof data);
  // console.log(req.body);
  var url="../public/images/uploads/out";
  // url+=Math.random().toString(36).substr(2);
   var base64Data =data.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(url, dataBuffer, function(err) {
      if(err){
       console.log(err);
      }else{
        // res.end(url.substring(9));
        res.end(url.substring(9));
        console.log("保存成功！");
      }
    });
   //  console.log("ggg");
}); 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
