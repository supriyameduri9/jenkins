var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')


// var moviesclientRouter = require('./src/routes/moviesclient');

var app = express();

//static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/css', express.static(__dirname + 'public/img'))
app.use('/css', express.static(__dirname + 'public/js'))

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//routes
var moviesclientRouter = require('./src/routes/moviesclient');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var signupHandler = require('./routes/signup');
var signinHandler = require('./routes/signin');
var signoutHandler = require('./routes/signout');


//app.use('/', moviesclientRouter);
app.use('/singlemoviearticle', moviesclientRouter);
app.use('/ma', moviesclientRouter)
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/signup', signupHandler);
app.use('/signin', signinHandler);
app.use('/signout', signoutHandler);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    if (res.headersSent) {
        return;
    }
    next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;