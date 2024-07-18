"use server";
import { getServerSession } from "next-auth";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";
import { revalidatePath } from "next/cache";

export const toggleReadStatus = async (bookId: string) => {
  const session = await getServerSession();

  if (!session) throw new Error("You must be logged in");
  if (!bookId) throw new Error("Invalid Book Id");

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
