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

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://fishtank-frontend.vercel.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['set-cookie'],
  optionsSuccessStatus: 200, // IE11 지원
  preflightContinue: false,
  maxAge: 86400 // 24시간 preflight 캐시
};

// CORS 미들웨어 적용
app.use(cors(corsOptions));

// 모든 OPTIONS 요청에 대한 명시적 처리
app.options('*', (req, res) => {
  console.log('🔍 OPTIONS 요청 받음:', {
    origin: req.headers.origin,
    method: req.method,
    path: req.path,
    headers: req.headers
  });

  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://fishtank-frontend.vercel.app'
  ];

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');

  res.status(200).end();
});

// 추가 CORS 헤더 수동 설정 (보험용)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://fishtank-frontend.vercel.app'
  ];

  console.log('🌐 요청 받음:', {
    method: req.method,
    path: req.path,
    origin: origin,
    userAgent: req.headers['user-agent']?.substring(0, 50)
  });

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  next();
});

app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS 설정
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://fishtank-frontend-git-achievements-combe4259s-projects.vercel.app',
    'https://fishtank-frontend.vercel.app',
  ],
  credentials: true
}));
// 🔍 디버깅용 미들웨어 - 모든 요청 로깅
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path}`, {
    origin: req.headers.origin,
    contentType: req.headers['content-type'],
    authorization: req.headers.authorization ? '토큰 있음' : '토큰 없음'
  });
  next();
});

// 라우터 설정
app.use('/', indexRouter);
app.use('/api/user', authRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/todos', todoRoutes);
app.use("/api/friends", friendsRoutes);
app.use('/api/achievements',achievementsRoutes);
app.use('/api/notifications', notificationsRoutes);

// Health check 엔드포인트
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: {
      enabled: true,
      allowedOrigins: corsOptions.origin
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('❌ 404 에러:', req.method, req.path);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error('💥 서버 에러:', {
    message: err.message,
    status: err.status,
    path: req.path,
    method: req.method,
    origin: req.headers.origin
  });

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // CORS 헤더 추가
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://fishtank-frontend.vercel.app'
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // API 요청인 경우 JSON으로 응답
  if (req.path.startsWith('/api/')) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || '서버 오류가 발생했습니다.',
      error: req.app.get('env') === 'development' ? err.stack : undefined
    });
  } else {
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

(async () => {
  try {
    console.log(' 데이터베이스 연결 테스트 중...');
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error(' 데이터베이스 연결 실패');
      process.exit(1);
    }
    console.log('데이터베이스 연결 성공');
    console.log(' 서버 초기화 완료');
    console.log('CORS 설정:', corsOptions.origin);
    return true;
  } catch (error) {
    console.error('초기화 실패:', error);
    process.exit(1);
  }
})();

module.exports = app;