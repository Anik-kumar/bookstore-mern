import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { PORT, MongoDBURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
// import { Book as iBook} from './interfaces/book.js';


const app = express();

// middleware for parsing req body
app.use(express.json());

// middleware for cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (req, res) => {
  res.status(234).send("Welcome to the page");
});

app.use("/api/books", bookRoutes);

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






