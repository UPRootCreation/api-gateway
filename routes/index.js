'use strict'

var express = require('express');
var TransactionController = require('../controllers/transaction');
var router = express.Router();

router.get('/images', TransactionController.getFileStream);
router.get('/images/:id', TransactionController.getFileStream);

router.get('/getData', TransactionController.getData);
router.post('/login', TransactionController.login);
router.post('/getInitialNonce', TransactionController.getInitialNonce);
router.get('/verifyEmail', TransactionController.verifyEmail);
router.post('/userCreation', TransactionController.userCreation);
router.get('/userDetails/:id', TransactionController.userDetails);
router.get('/usersDetails/:page?', TransactionController.usersDetails);
router.put('/userUpdate/:id', TransactionController.userUpdate);
router.delete('/userDelete/:id', TransactionController.userDelete);
router.post('/emailToReset', TransactionController.emailToReset);
router.get('/resetPassword', TransactionController.resetPasswordGET);
router.put('/resetPassword', TransactionController.resetPasswordPUT);

router.post('/merchantsData', TransactionController.merchantsData);
router.post('/getCompanyM', TransactionController.getCompanyM);
router.post('/merchantsCompany', TransactionController.merchantsCompany);
router.post('/getCompanyC', TransactionController.getCompanyC);
router.post('/carriersData', TransactionController.carriersData);
router.post('/carriersCompany', TransactionController.carriersCompany);
router.post('/getCompanyA', TransactionController.getCompanyA);
router.post('/acopiosData', TransactionController.acopiosData);
router.post('/acopiosCompany', TransactionController.acopiosCompany);
router.post('/getCompanyP', TransactionController.getCompanyP);
router.post('/productorsData', TransactionController.productorsData);
router.post('/productorsCompany', TransactionController.productorsCompany);
router.post('/traceability', TransactionController.traceability);
router.get('/getHistory', TransactionController.getHistory);

//router.post('/traceabilityM', TransactionController.traceabilityM);
//router.post('/traceabilityC', TransactionController.traceabilityC);
//router.post('/traceabilityA', TransactionController.traceabilityA);
//router.post('/traceabilityP', TransactionController.traceabilityP);

//router.get('/');

router.get('/', function(req, res){
	res.render('index');
});

module.exports = router;
