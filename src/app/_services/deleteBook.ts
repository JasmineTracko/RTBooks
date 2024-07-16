"use server";
import { getServerSession } from "next-auth";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";
import { revalidatePath } from "next/cache";

export const deleteBook = async (bookId: string) => {
  const session = await getServerSession();

  if (!session) throw new Error("You must be logged in");
  if (!bookId) throw new Error("Invalid Book Id");

  await connectDB();
  await Book.findByIdAndDelete({ _id: bookId });
  revalidatePath("/booklist");
};
