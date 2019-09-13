function User(values) {
     this.userid = null
     this.firstName = values.fName
     this.lastName = values.lName
     this.email = values.email
     this.password = values.password
     this.googleId = null
     this.facebookId = null

     console.log(values)
  }


module.exports = User;
