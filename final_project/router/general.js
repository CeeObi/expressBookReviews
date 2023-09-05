const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  username= req.body.username
  password= req.body.password    
    if (username && password){         
      for (let i=0; i<users.length; i++){        
            if (users[i].username===username){
                return res.status(404).json({Error: "Username already exixts"});
            }
        }
      users.push({username:username,password:password})
      return res.status(200).json("New username have been successfully registered")
      } 
     else{
        return res.status(404).json({Error: "Please provide username or password!"})
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const promise = new Promise((resolve,reject)=>{      
      setTimeout(() => {
        resolve(JSON.stringify(books))
      }, 3000);       
    })
    promise.then((successMessage)=>{res.send(successMessage)})   
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const promise = new Promise((resolve,reject)=>{
    let isbn = req.params.isbn;
    let book = books[isbn];    
    setTimeout(()=>{resolve(JSON.stringify(book));},6000 )    
})
promise.then((successMessage)=>{res.send(successMessage)}
)
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here 
  let promise=new Promise((resolve,reject)=>
  {    
        let author = JSON.stringify(req.params.author);      
            let found_book = []
            Object.entries(books).forEach(([key,value]) => {
                let authr =JSON.stringify(value['author'])            
                if (author === authr){
                    found_book.push(books[key])            
                }         
            })
        
        setTimeout(()=>
        {
                if (found_book.length > 0){                
                        resolve(JSON.stringify(found_book))
                }
                else{
                reject({Error: "Book author is unavaiable"})
                }
        },3000)    
   }
) 

promise.then((successMessage)=>{res.send(successMessage)},(failedMessage)=>{res.send(failedMessage)})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   //Write your code here
let promise=new Promise((resolve,reject)=>{
   let title = JSON.stringify(req.params.title);     
   let found_book = []
   Object.entries(books).forEach(([key,value]) => {
       let ttle =JSON.stringify(value['title'])            
       if (title === ttle){
        found_book.push(books[key])            
       }         
   })
   setTimeout(()=>
    {
        if (found_book.length > 0){                
                resolve(JSON.stringify(found_book))
        }
        else{
            reject({Error: "Book title is unavaiable"})
        }    
    },3000)
})
promise.then((successMessage)=>{res.send(successMessage)},(failedMessage)=>{res.send(failedMessage)})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    let isbn = req.params.isbn;
    let book = books[isbn]['reviews'];
    res.send(JSON.stringify(book));
 });

module.exports.general = public_users;
