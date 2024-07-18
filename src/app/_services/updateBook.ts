"use server";
import connectDB from "../../../config/database";
import Book from "../../../models/Book";
import { revalidatePath } from "next/cache";
import cloudinary from "../../../config/cloudinary";
import { redirect } from "next/navigation";
import { isAdmin } from "./checkIsAdmin";

export const updateBook = async (formData: FormData) => {
  const bookId = formData.get("id");
  if (!bookId) throw new Error("Invalid Book Id");

  await isAdmin();
  await connectDB();

  let imageUrl = null;
  const image = formData.get("image");
  const existingImage =
    image &&
    image instanceof File &&
    image.name !== undefined &&
    image.size > 0;

  if (existingImage) {
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

    imageUrl = result.secure_url;
  }

  const bookToModify = await Book.findById(bookId);
  if (!bookToModify) throw new Error("Invalid Book ID.");

  const bookData = {
    title: formData.get("title") || bookToModify.title,
    author: formData.get("author") || bookToModify.author,
    read: formData.get("read") === "read" ? true : false,
    image: imageUrl || bookToModify.image,
  };

  await Book.findByIdAndUpdate(bookId, bookData);

  revalidatePath(`booklist/${bookId}`);
  revalidatePath("/booklist");

  redirect("/booklist");
};
