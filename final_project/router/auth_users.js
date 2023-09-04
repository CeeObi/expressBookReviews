const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let isUserValid = users.filter((user)=>{return user.username===username})
if (isUserValid){
    return true
}
else {
    return false
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
for (let i=0; i<=users.length; i++){
    if (users[i].username===username&&users[i].password===password){        
        return true
    }
    else{
        return false
    }
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username= req.body.username
  let password= req.body.password  
  const authUser =  authenticatedUser(username,password)
  if (authUser){
      let accessToken=jwt.sign({data:password},"access",{expiresIn:60*60})
      req.session.authorization={accessToken,username}
      return res.status(200).json("User have successfully logged in")
  }
  else
      return res.status(208).json({message: "Invalid Login. Check username and password"})
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
     //Write your code here
  let isbn = req.query.review;    //?review=1
  let review =req.body.review
    let book = books[isbn];
    console.log(req.user)
    console.log(book)
    console.log(review)
    //Stoppped here in Task 8.
    

  


  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
