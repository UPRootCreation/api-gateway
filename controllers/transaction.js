'use strict'
var axios = require('axios');
var jwt = require('jwt-simple');

function getInitialNonce(req, res){
  //console.log(req.body);
  serviceInitGetNonce(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      if (data.message == 'deny') {
        res.status(200).send({  message: data.message, A: data.A, NA: data.NA });
      }else {
        res.status(200).send({ A: data.A, NA: data.NA, NB: data.NB });
      }
    }
  });
}

function serviceInitGetNonce(req, next) {
  var url = 'http://'+host+':'+port.users+''+path.getInitialNonce;
  axios.post(url, {
    na: req.body.na, //se comenta mientras se hacen las pruenas sin un cliente que pueda usar estos datos
    session: req.session.id
  })
  .then(response => {
    //console.log(response.data);
    next(response.data, null);
  })
  .catch(error => {
    console.log(error);
    next(null, error);
  });
}

function login(req, res){
  serviceInitLogin(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      res.status(200).send({ message: data.message, token: data.token, user: data.user });
      //console.log(data);
    }
  });
}

function serviceInitLogin(req, next) {
    var url = 'http://'+host+':'+port.users+''+path.userLogin+'';
    axios.post(url, {
        email: req.body.email,
        password: req.body.password,
        //typeOfUser: req.body.typeOfUser,
        typeOfOperation: req.body.typeOfOperation,
        nameOfOperation: req.body.nameOfOperation
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        console.log(error);
        next(null, error.response.data.message);
    });
}

function userCreation(req, res){
  serviceInitUserCreationRoot(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      if(data.user){
        res.status(200).send({ message: data.message, A: data.A, token: data.token });
      }else if(data.sessionID){
        res.status(200).send({ message: data.message, sessionID: data.sessionID, token: data.token});
      }else {
        res.status(200).send({ message: data.message, A: data.A, token: data.token});
      }
    }
  });
}

function serviceInitUserCreationRoot(req, next) {
  var url = 'http://'+host+':'+port.users+''+path.userCreation+'';
    axios.post(url, {
        email: req.body.email,
        password: req.body.password,
        surnameA: req.body.surnameA,
        surnameB: req.body.surnameB,
        nameOfUser: req.body.nameOfUser,
        typeOfUser: req.body.typeOfUser,
        status: req.body.status,
        creationDate: req.body.creationDate,
        initialToken: req.body.initialToken,
        dp: req.body.dp,
        addressU: req.body.addressU,
        typeOfOperation: req.body.typeOfOperation,
        nameOfOperation: req.body.nameOfOperation,
        hashX: req.body.hashX,
    },
    {
        headers: {
            'Authorization': req.headers.authorization,
            'Session': req.headers.session
        }
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        console.log(error);
        //console.log(error.response.data.message);
        next(null, error);
    });
}

module.exports = {
  getInitialNonce,
  login,
  userCreation
};
