var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


///////////////////////////////////////   API    /////////////////////////////////////////////////////////

var HomeRouter = require('./routes/Page/Home');
var DiaDiemNoiBatChiTietRouter = require('./routes/Component/DiaDiemNoiBatChiTiet');
var TypeApartmentRouter = require('./routes/Component/TypeApartment');
var ApartmentDetail = require('./routes/Page/ApartmentDetail')
var CheckBooking = require('./routes/Component/CheckBooking')
var InfoUser = require('./routes/Component/InfoUser')
var Booking = require('./routes/Page/Booking')
var Register = require('./routes/Component/Register')
var SendMailForResgister  =require('./routes/Modul/SendMailForResgister');
var comfimRegister  =require('./routes/Component/ComfimResister');
var UpdateProfileOwn  =require('./routes/Component/UpdateProfileOwn');
var UploadImageOwn  =require('./routes/Component/UpdateImage/UploadImageOwn');
 
// var swagger = require('./swagger/index.html');

var app = express();


// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   )
//   if(req.method === 'OPTION'){
//     res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
//     return res.status(200).json({});
//   }
//   next();
// });

// view engine setup

var whitelist = ['http://localhost:3000', 'https://project-dariu.herokuapp.com','http://localhost:8001','https://do-an-nho-nho.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

///////////////////////////////////////////////////////////////

app.use('/home',HomeRouter);
app.use('/apartments',DiaDiemNoiBatChiTietRouter);
app.use('/apartments',TypeApartmentRouter);
app.use('/apartments',ApartmentDetail);
app.use('/apartments',CheckBooking);
app.use('/infoUser',InfoUser);
app.use('/booking',Booking);
app.use('/register',Register);
app.use('/sendMailForResgister',SendMailForResgister);
app.use('/comfimRegister',comfimRegister);
app.use('/updateProfileOwn',UpdateProfileOwn);
app.use('/uploadImageOwn',UploadImageOwn);

// app.use('/swagger',swagger);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
