import express from "express";
import mongoose from "mongoose";
import { PORT, MongoDBURL } from "./config.js";
import { Book } from './models/bookModel.js';
// import { Book as iBook} from './interfaces/book.js';


const app = express();

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log(`Server is connected to database.`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`error connecting database`);
    console.log(err);
  });


app.get('/', (req, res) => {
  res.status(234).send("Welcome to the page");
});

app.post('/books', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: "title, author, publishYear are required fields"});
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    };

    const book = await Book.create(newBook);
    
    return res.status(201).send(book);
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
});




