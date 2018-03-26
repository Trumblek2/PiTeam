var express = require('express');
var router = express.Router();
var navbarjs = require('../public/javascripts/navbar');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
var RegValidateServer = require('../public/javascripts/RegValidateServer');

var urlencodedParser = bodyParser.urlencoded({extended : false});

function getLoginForm(){
  var login = '';
  login += '<form action="/users/login" method="post" id="login"';
  
  login += '<div class="form-group">';
  login += '<label class="control-label col-sm-2" for="pwd">Username:</label>';
  login += '<div class="col-sm-10">';
  login += '<input type="text" class="form-control" id="username" name ="username" placeholder="Enter Username">';
  login += '<p id ="usernameWarning" class="validation-error"></p>';
  login += '</div>';

  login += '<div class="form-group">';
  login += '<label class="control-label col-sm-2" for="pwd">Password:</label>';
  login += '<div class="col-sm-10">';
  login += '<input type="password" class="form-control" id="password" name ="password" placeholder="Enter Password">';
  login += '<p id ="passwordWarning" class="validation-error"></p>';
  login += '</div>';
  login += '</div>';

  login += '<div class="form-group">';
  login += '<div class="col-sm-offset-2 col-sm-10">';
  login += '<input type="submit" value="Log In">';
  login += '</div>';
  login += '</div>';

  login += '</form>';



  return login;
}

function getRegisterForm(ServerWarning){
  var register = '';
  register += '<form action="/users/register" method="post" id="register">';

  register += '<div class="form-group">';
  register += '<p id ="serverWarning" class="validation-error">' + ServerWarning + '</p>';
  register += '</div>';

  register += '<div class="form-group">';
  register += '<label class="control-label col-sm-2" for="pwd">First Name:</label>';
  register += '<div class="col-sm-10">';
  register += '<input type="text" class="form-control" id="firstName" name ="firstName" placeholder="Enter First Name">';
  register += '<p id ="firstNameWarning" class="validation-error"></p>';
  register += '</div>';
  register += '</div>';

  register += '<div class="form-group">';
  register += '<label class="control-label col-sm-2" for="pwd">Last Name:</label>';
  register += '<div class="col-sm-10">';
  register += '<input type="text" class="form-control" id="lastName" name ="lastName" placeholder="Enter Last Name">';
  register += '<p id ="lastNameWarning" class="validation-error"></p>';
  register += '</div>';
  register += '</div>';

  register += '<div class="form-group">';
  register += '<label class="control-label col-sm-2" for="pwd">Username:</label>';
  register += '<div class="col-sm-10">';
  register += '<input type="text" class="form-control" id="username" name ="username" placeholder="Enter Username">';
  register += '<p id ="usernameWarning" class="validation-error"></p>';
  register += '</div>';
  register += '</div>';

  register += '<div class="form-group">';
  register += '<label class="control-label col-sm-2" for="pwd">Password:</label>';
  register += '<div class="col-sm-10">';
  register += '<input type="password" class="form-control" id="password" name ="password" placeholder="Enter Password">';
  register += '<p id ="passwordWarning" class="validation-error"></p>';
  register += '</div>';
  register += '</div>';

  register += '<div class="form-group">';
  register += '<label class="control-label col-sm-2" for="pwd">Confirm Password:</label>';
  register += '<div class="col-sm-10">';
  register += '<input type="password" class="form-control" id="passwordConf" name ="passwordConf" placeholder="Confirm Password">';
  register += '<p id ="passwordConfWarning" class="validation-error"></p>';
  register += '</div>';
  register += '</div>';

  register += '<div class="form-group">';
  register += '<label class="control-label col-sm-2" for="pwd">Email:</label>';
  register += '<div class="col-sm-10">';
  register += '<input type="text" class="form-control" id="email" name ="email" placeholder="Enter Email">';
  register += '<p id ="emailWarning" class="validation-error"></p>';
  register += '</div>';
  register += '</div>';

  register += '<div class="form-group">';
  register += '<label class="control-label col-sm-2" for="pwd">Confirm Email:</label>';
  register += '<div class="col-sm-10">';
  register += '<input type="text" class="form-control" id="emailConf" name ="emailConf" placeholder="Confirm Email">';
  register += '<p id ="emailConfWarning" class="validation-error"></p>';
  register += '</div>';
  register += '</div>';

  register += '<div class="form-group">';
  register += '<div class="col-sm-offset-2 col-sm-10">';
  register += '<input id="submitBtn" type="submit" value="Register">';
  register += '</div>';
  register += '</div>';

  register += '</form>';

  register += '<script type="text/javascript" src="/javascripts/RegValidate.js"></script>';

  return register;
}

function getValidRules(type){
  var script = '';
  
  if(type == 'register'){
    script += '<script type="text/javascript" src="/javascripts/RegValidate.js"></script>';
  }

  return script;
}


/* GET users listing. */
router.get('/login', function(req, res, next) {
  console.log('This is working');
  var navbar = navbarjs.buildNav(9);
  var login = getLoginForm();
  var validation = getValidRules('login');
  //console.log('navbar: ' + navbar);
  res.render('login', { 
    nav : navbar,
    formType : login,
    validRules : validation
  });
});

router.post('/login', urlencodedParser, function(req, res, next) {
  console.log('login post request');
  console.log('Username: ' + req.body.username);
  console.log('Password: ' + req.body.password);

  var username = req.body.username;
  var password = req.body.password;

  let usersDB = new sqlite3.Database('./databases/users.db', (err) => {
    if (err) {
        console.error(err.message);
    }else{
        console.log('Connected to the users database.');
    }
  });

  usersDB.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if(err){
      console.error(err.message);
    }

  }, function(err, row){

    //console.log(row);
    bcrypt.compare(password, row.password, function(err, match){
      if(err){
        console.error(err.message);
      }
      console.log('Match: ' + match);
      if(match){
        console.log('Login Successful');
        res.redirect('/');
      }else{
        console.log('Login Unsuccessful');
        var navbar = navbarjs.buildNav(9);
        var login = getLoginForm();
        var validation = getValidRules('login');
        res.render('login', { 
          nav : navbar,
          formType : login,
          validRules : validation
        });
      }
    });

    usersDB.close((err) => {
      if (err) {
          console.error(err.message);
      }
      console.log('Close the database connection.');
    });

  });
});



router.get('/register', function(req, res, next) {
  var navbar = navbarjs.buildNav(10);
  var register = getRegisterForm('');
  var validation = getValidRules('register');
  
  //console.log('navbar: ' + navbar);
  res.render('login', { 
    nav : navbar,
    formType : register,
    validRules : validation
  });
});



router.post('/register', urlencodedParser, function(req, res, next) {
  //console.log(req.body);
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var username = req.body.username;
  var password = req.body.password;
  var passwordConf = req.body.passwordConf;
  var email = req.body.email;
  var emailConf = req.body.emailConf;

  /*console.log('Hit post request for register');
  console.log('First Name: ' + firstName);
  console.log('Last Name: ' + lastName);
  console.log('Username: ' + username);
  console.log('Password: ' + password);
  console.log('Password Confirm: ' + passwordConf);
  console.log('Email: ' + email);
  console.log('Email Confirm: ' + emailConf);*/

  var serverValidationWarning = RegValidateServer.checkInfo(firstName, lastName, username, password, passwordConf, email, emailConf);

  console.log('Warning: ' + serverValidationWarning);

  if(serverValidationWarning != ''){
    var navbar = navbarjs.buildNav(10);
    var register = getRegisterForm(serverValidationWarning);
    var validation = getValidRules('register');
  
    //console.log('navbar: ' + navbar);
    res.render('login', { 
      nav : navbar,
      formType : register,
      validRules : validation
    });
  }else{

    bcrypt.hash(password, 10, function(err, hash){
      console.log('begin hash');
      if(err){
        console.message(err.message);
      }
      console.log('Password: ' + password);
      console.log('Hash: ' + hash);

      let usersDB = new sqlite3.Database('./databases/users.db', (err) => {
        if (err) {
          console.error(err.message);
        }else{
          console.log('Connected to the users database.');
        }
      });
    
      usersDB.run("INSERT INTO users VALUES (?, ?, ?, ?, ?)", [username, hash, email, firstName, lastName], function(err){
        if(err){
          console.error(err.message);
        }
        console.log("Added user to database with username:" + username);
      });

      usersDB.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the users database connection.');
      });

      res.redirect('/users/login');
    });
  }
});

module.exports = router;
