'use stric'
//
//global.host = 'host.docker.internal'; //host.docker.internal
global.host = {
  audit: '172.18.1.4',
  users: '172.18.1.5',
  merchant: '172.18.1.6',
  carrier: '172.18.1.7',
  acopio: '172.18.1.8',
  productor: '172.18.1.9',
  traceability: '172.18.1.10'
};
global.port = {
  audit: '3000',
  users: '3001',
  merchant: '3002',
  carrier: '3003',
  acopio: '3004',
  productor: '3005',
  traceability: '3006'
};
global.path = {
  audit: '/exec/createUserSC',
  getInitialNonce: '/getInitialNonce',
  verifyEmail: '/verifyEmail/',
  userLogin: '/login',
  userCreation: '/userCreation',
  userRegister: '/register',
  userDetails: '/userDetails/',
  usersDetails: '/usersDetails/',
  userUpdate: '/userUpdate/',
  userDelete: '/userDelete/',
  emailToReset: '/emailToReset',
  resetPassword: '/resetPassword',
  getData: '/getData',
  merchantsCompany: '/dataOfCompany',
  getCompanyM: '/getCompany',
  merchant: '/merchantsData',
  carriersCompany: '/dataOfCompany',
  getCompanyC: '/getCompany',
  carrier: '/carriersData',
  acopiosCompany: '/dataOfCompany',
  getCompanyA: '/getCompany',
  acopio: '/acopiosData',
  productorsCompany: '/dataOfCompany',
  getCompanyP: '/getCompany',
  productor: '/productorsData',
  getCompany: '/getCompany',
  dataOfCompany: '/dataOfCompany',
  traceability: '/traceability',
  traceabilityM: '/traceabilityM',
  traceabilityC: '/traceabilityC',
  traceabilityA: '/traceabilityA',
  traceabilityP: '/traceabilityP',
  getHistory: '/getHistory'
};
//
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var multer = require('multer');
var path = require('path');
var uuid = require('uuid');

//New
var logger = require('morgan');
//New


var app = express();

app.set('trust proxy', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
});

/*var storage = multer.diskStorage({
  //destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname).toLowerCase());
  }
});*/

app.use(multer({storage}).single('image'));
/*
app.use(multer({
  storage,
  //dest: path.join(__dirname, 'public/uploads'),
  limits: {filseSize: 1000000},
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
}).single('image'));
*/
// Static files
app.use(express.static(path.join(__dirname, 'public')));

//Cargar rutas
//var user_routes = require('./routes/user');
var api_gateway_routes = require('./routes/index');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//New
app.use(logger('dev'));
//New

app.use(session({
  secret: 'foo',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 600000
  }
}));

//Configurar cabeceras HTTP y cors
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Carga de rutas base
//app.use('/api', user_routes);
app.use('/', api_gateway_routes);

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
  var resp = {message:"error de api-gateway - :C | "+err};
  res.send(resp);
  //res.render('error');
});

module.exports = app;
