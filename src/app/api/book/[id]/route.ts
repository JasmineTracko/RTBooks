import connectDB from "../../../../../config/database";
import { getServerSession } from "next-auth";
import Book from "../../../../../models/Book";
import cloudinary from "../../../../../config/cloudinary";

// DELETE /api/book/:id
export const DELETE = async (request: any, { params }: any) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getServerSession();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", { status: 401 });
    }

    const bookToDelete = await Book.findById(id);

    if (!bookToDelete) return new Response("Book Not Found", { status: 404 });

    await Book.deleteOne();

    return new Response("Book Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// PATCH /api/book/:id
export const PUT = async (request: any, { params }: any) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getServerSession();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", { status: 401 });
    }

    const formData = await request.formData();

    const image = formData.get("image");

    if (!image) {
      return new Response("Image is required", { status: 400 });
    }

    // Create bookData object for database
    const bookData = {
      title: formData.get("title"),
      author: formData.get("author"),
      read: formData.get("read") === "read" ? true : false,
      image: "",
    };

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

    bookData.image = result.secure_url;

    const bookToModify = await Book.findById(id);

    if (!bookToModify) return new Response("Book Not Found", { status: 404 });

    const updatedBook = bookData;

    await Book.findByIdAndUpdate(id, updatedBook);

    return new Response("Book Updated", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};