import { notFound } from "next/navigation";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";

export const getBookById = async (id: string) => {
  try {
    await connectDB();
    const book: Book | null = await Book.findById(id);
    return book;
  } catch (error) {
    notFound();
  }
};
