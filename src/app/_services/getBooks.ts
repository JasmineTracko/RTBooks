import { notFound } from "next/navigation";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";

export const getBooks = async () => {
  try {
    await connectDB();
    const books: Book[] = await Book.find({});
    return books;
  } catch (error) {
    notFound();
  }
};
