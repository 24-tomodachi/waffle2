var favicon = require('serve-favicon');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.broadcast.emit("join", { userSessionId: socket.id });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const roomRouter = require('./routes/rooms');
const apiRouter = require('./routes/api');

const authCheck = require('./src/middleware/authCheck');
const { log } = require('console');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use('/api', apiRouter);
app.use('/users', authCheck, userRouter);
app.use('/rooms', authCheck, roomRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, server, io };
