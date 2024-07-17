"use server";
import { getServerSession } from "next-auth";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";
import { revalidatePath } from "next/cache";
import cloudinary from "../../../config/cloudinary";

export const updateBook = async (formData: FormData) => {
  const session = await getServerSession();

  const bookId = formData.get("id");

  if (!session) throw new Error("You must be logged in");
  if (!bookId) throw new Error("Invalid Book Id");

  await connectDB();

  const image = formData.get("image");

  if (!image || !(image instanceof File)) {
    throw new Error("Image is Required");
  }

  const imageBuffer = await image.arrayBuffer();
  const imageArray = Array.from(new Uint8Array(imageBuffer));
  const imageData = Buffer.from(imageArray);

  const imageBase64 = imageData.toString("base64");

  // Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBase64}`,
    {
      folder: "books",
    }
  );

  const bookData = {
    title: formData.get("title"),
    author: formData.get("author"),
    read: formData.get("read") === "read" ? true : false,
    image: result.secure_url,
  };

  const bookToModify = await Book.findById(bookId);

  if (!bookToModify) throw new Error("Invalid Book ID.");

  await Book.findByIdAndUpdate(bookId, bookData);
  
  revalidatePath(`booklist/${bookId}`);
  revalidatePath("/booklist");
};
