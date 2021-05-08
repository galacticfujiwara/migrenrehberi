const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const userRouter = require('./routes/UserRoutes/Users');

const User = require('./models/User') ; 
//const userRouter = require('./routes/users');


const app = express();
app.use(cors());
//db connection
const db= require('./helper/db.js')();
//Config
const config = require('./config');
app.set('api_secret_key',config.api_secret_key);
//Middleware token verify
const verifyToken=require('./milddleware/verify-token');
 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes

//index
app.use('/', indexRouter);
//app.use('/',verifyToken);
 

//user
app.use('/user', userRouter); 






// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(err);
});
// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({error:err.message});
});


module.exports = app;
