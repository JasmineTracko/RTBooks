import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Book = models.Book || model("Book", BookSchema);
export default Book;
