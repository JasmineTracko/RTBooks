"use server";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";
import { revalidatePath } from "next/cache";
import { isAdmin } from "./checkIsAdmin";

export const toggleReadStatus = async (bookId: string) => {
  if (!bookId) throw new Error("Invalid Book Id");

  await isAdmin();
  await connectDB();

  const bookToModify = await Book.findById(bookId);
  if (!bookToModify) throw new Error("Invalid Book ID.");

  const bookData = {
    title: bookToModify.title,
    author: bookToModify.author,
    read: !bookToModify.read,
    image: bookToModify.image,
  };

  await Book.findByIdAndUpdate(bookId, bookData);

  revalidatePath("/", "layout");
};
