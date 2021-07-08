'use strict'

var express = require('express');
var TransactionController = require('../controllers/transaction');
var router = express.Router();

router.post('/login', TransactionController.login);
router.post('/getInitialNonce', TransactionController.getInitialNonce);
router.post('/userCreation', TransactionController.userCreation);

router.get('/', function(req, res){
	res.render('index');
});

module.exports = router;
