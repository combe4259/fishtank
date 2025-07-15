var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config({ path: '../.env' })

const {testConnection} = require('./config/database')

var indexRouter = require('./routes/index');
const authRoutes = require('./routes/user');
const githubRoutes = require('./routes/github');
const shopRoutes = require('./routes/shop')
const todoRoutes = require('./routes/todo');
const friendsRoutes = require('./routes/friends');
const notificationsRoutes = require('./routes/notifications');
const achievementsRoutes = require('./routes/achievements');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3001',
    'https://fishtank-frontend.vercel.app',
    'https://fishtank-2wr5.onrender.com'
    // 'https://fishtank-production.up.railway.app'


  ],
  credentials: true,
}));
// 라우터 설정
app.use('/', indexRouter);
app.use('/api/user', authRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/todos', todoRoutes);
app.use("/api/friends", friendsRoutes);
app.use('/api/achievements',achievementsRoutes);
app.use('/api/notifications', notificationsRoutes);



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

(async () => {
  try {
    console.log('데이터베이스 연결 테스트 중...');
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('데이터베이스 연결 실패');
      process.exit(1);
    }
    console.log('데이터베이스 연결 성공');
    return true;
  } catch (error) {
    console.error('앱 초기화 실패:', error);
    process.exit(1);
  }
})();


module.exports = app;