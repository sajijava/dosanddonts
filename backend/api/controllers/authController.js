var User = require('../../models/UserModel')
var UserSession = require('../../models/UserSessionModel')
var Notifications = require('../../models/UserSessionModel')
const dbpool  = require('../models/db')
const uuidv4 = require('uuid/v4');


exports.login = function(req, res){
  console.log("Login")
  console.log(req.body)

}


function addUser(req){
  return new Promise(function(resolve,reject){
    user = new User(req.body)
    dbpool.query("INSERT INTO USERS(FIRST_NAME,LAST_NAME,EMAIL,PASSWORD) VALUES(?,?,?,?)",
    [user.firstName, user.lastName, user.email, user.password],(error,result) => {
      if(error) throw reject(error);
      resolve(user);
    })
  })
}
function createUserSession(user){
  return new Promise(function(resolve,reject){
    token = uuidv4()
    console.log(token)
    dbpool.query("INSERT INTO USER_SESSION(USER_ID,TOKEN) VALUES((SELECT ID FROM USERS WHERE EMAIL = ? ),?)",
    [user.email,token],(error,result) => {
      if(error) throw reject(error);

      userSession = new UserSession()
      userSession.email = user.email
      userSession.password = user.password
      userSession.token = token
      resolve(userSession)
    });


  });
}

exports.register = function(req, res){
  addUser(req)
  .then(createUserSession)
  .then(function(x){
    console.log(x)
    res.json(x);
  })

}

exports.logout = function(req, res){
  console.log("logout")
  console.log(req.params)
  console.log(req.body)
}

exports.getUser = function(req, res){
  console.log("getUser")
  console.log(req.params)
  console.log(req.body)
}
