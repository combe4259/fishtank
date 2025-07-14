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
const achievementsRoutes = require('./routes/achievements')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//HTML <form>에서 POST 방식으로 데이터를 보낼 때,
// 그 데이터를 req.body에 파싱해서 넣어주는 역할
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS 설정
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/', indexRouter);
app.use('/api/user', authRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/shop',shopRoutes)
app.use('/api/achievements',achievementsRoutes)


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
