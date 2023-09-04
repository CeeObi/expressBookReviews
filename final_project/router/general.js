const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  username= req.body.username
  password= req.body.password  
  console.log(username)
  console.log(password)
  if (username.length<1 || password.length<1){
    res.send({Error: "Please provide username or password!"})}
    //this last part above just worked out
    
  else{
    for (let i=1; i<=users.length; i++){
        if (users[i]["username"]===username){
            res.send({Error: "Username already exixts"})}
        }
    }
    users.push({username:username,password:password})  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
  let isbn = req.params.isbn;
    let book = books[isbn];
    res.send(JSON.stringify(book));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = JSON.stringify(req.params.author);  
    //STILL TRYING TO SORT HERE OUT, TASK 3  
    let found_book = []
    Object.entries(books).forEach(([key,value]) => {
        let authr =JSON.stringify(value['author'])            
        if (author === authr){
            found_book.push(books[key])            
        }         
    })
    if (found_book.length > 0){
            console.log("Yes")
            res.send(JSON.stringify(found_book))}
    else{
    res.send({Error: "Book author is unavaiable"})}    
 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   //Write your code here
   let title = JSON.stringify(req.params.title);     
   let found_book = []
   Object.entries(books).forEach(([key,value]) => {
       let ttle =JSON.stringify(value['title'])            
       if (title === ttle){
        found_book.push(books[key])            
       }         
   })
   if (found_book.length > 0){
           console.log("Yes")
           res.send(JSON.stringify(found_book))}
   else{
   res.send({Error: "Book title is unavaiable"})}    

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    let isbn = req.params.isbn;
    let book = books[isbn]['reviews'];
    res.send(JSON.stringify(book));
 });

module.exports.general = public_users;
