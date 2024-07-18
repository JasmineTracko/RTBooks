"use server";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";
import { revalidatePath } from "next/cache";
import { isAdmin } from "./checkIsAdmin";

export const deleteBook = async (bookId: string) => {
  if (!bookId) throw new Error("Invalid Book Id");
  await isAdmin();

  await connectDB();
  await Book.findByIdAndDelete({ _id: bookId });

  revalidatePath("/booklist");
};
