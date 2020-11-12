const express = require('express');
const path = require('path');
const app = express();
const productData = require('./data.json');

//Everything within the public directory will be accessible
app.use(express.static(path.join(__dirname, 'public')));

//view engine is looking for ejs file
app.set('view engine', 'ejs');

//Normalize multiple path to a single path
//__dirname refers to directory name where index.js is located
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req,res) => {
    res.render('home');
})

app.get('/products', (req, res) =>{
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('products', {num});
})

app.get('/about', (req, res) =>{
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('about', {num});
})

app.get('/r/:subreddit', (req,res) => {
   const {subreddit} = req.params;
   const data = productData[subreddit];
   if(data){
       res.render('subreddit', { ...data });
   } else {
       res.render('notfound', {subreddit});
   }
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})