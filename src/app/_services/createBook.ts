"use server";
import { getServerSession } from "next-auth";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";
import { revalidatePath } from "next/cache";
import cloudinary from "../../../config/cloudinary";

export const createBook = async (formData: FormData) => {
  const session = await getServerSession();

  if (!session) throw new Error("You must be logged in");

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

  const newBook = new Book(bookData);
  await newBook.save();

  revalidatePath("/booklist");
};
