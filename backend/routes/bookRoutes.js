import express from "express";
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
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


router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).send({
      count: books.length,
      data: books
    });
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
});


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    return res.status(200).send(book);
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
});


router.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: "title, author, publishYear are required fields"});
    }

    
    const id = req.params.id;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if(!result) {
      return res.status(200).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully"});
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
});


router.delete('/:id', async (req, res) => {
  try {
    
    const id = req.params.id;
    
    const result = await Book.findByIdAndDelete(id);

    if(!result) {
      return res.status(200).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully"});
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
});


export default router;