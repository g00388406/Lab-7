const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// mongoose code
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.uilc9ng.mongodb.net/?retryWrites=true&w=majority');
}

//defining the schema
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

//creating the model
const bookModel = mongoose.model('books', bookSchema);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/books',(req,res)=>{
  bookModel.create({
    title:req.body.title,
    cover:req.body.cover,
    author:req.body.author
  })
  res.send('Data Recieved');
})

app.get('/api/books', (req, res) => {
  // const books = [
  //   {
  //     "title": "Learn Git in a Month of Lunches",
  //     "isbn": "1617292419",
  //     "pageCount": 0,
  //     "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/umali.jpg", "status": "MEAP",
  //     "authors": ["Rick Umali"],
  //     "categories": []
  //   },
  //   {
  //     "title": "MongoDB in Action, Second Edition",
  //     "isbn": "1617291609",
  //     "pageCount": 0,
  //     "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/banker2.jpg",
  //     "status": "MEAP",
  //     "authors": [
  //       "Kyle Banker",
  //       "Peter Bakkum",
  //       "Tim Hawkins",
  //       "Shaun Verch",
  //       "Douglas Garrett"
  //     ],
  //     "categories": []
  //   },
  //   {
  //     "title": "Getting MEAN with Mongo, Express, Angular, and Node",
  //     "isbn": "1617292036",
  //     "pageCount": 0,
  //     "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/sholmes.jpg",
  //     "status": "MEAP",
  //     "authors": ["Simon Holmes"],
  //     "categories": []
  //   }
  // ]

  bookModel.find((err,data)=>{
    console.log(data);
    res.json(data);
  })

  //finding the id of a particular book
  app.get('/api/book/:id',(req,res)=>{
    console.log(req.params.id);
    bookModel.findById(req.params.id,(err,data)=>{
      res.json(data);
    });
  })

//   res.json({
//     myBooks: books,
//     message: 'Hello from the server'
//   })
 })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})