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
if (users.length>0){
for (let i=0; i<=users.length; i++){
    if (users[i].username===username&&users[i].password===password){        
        return true
    }   
}
}
return false
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username= req.body.username
  let password= req.body.password  
  const authUser =  authenticatedUser(username,password)
  if (authUser){
      let accessToken=jwt.sign({password:password,username:username},"access",{expiresIn:15})
      req.session.authorization={accessToken,username}
      console.log(req.session.authorization)
      return res.status(200).json("User have successfully logged in")
  }
  else
      return res.status(208).json({message: "Invalid Login. Check username and password"})
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
     //Write your code here
  let isbn = req.params.isbn;   
  let review =req.query.review  //auth/review/1?review=Great
    let book = books[isbn];    
    let username = req.user.username //auth/review/1?review=Great&&username=John
                    //req.user.username;   req.query.username   
    book.reviews[username]=review
    console.log(book)
  return res.status(200).json(book);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
