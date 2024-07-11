import connectDB from "../../../../config/database";
import Book from "../../../../models/Book";
import { getServerSession } from "next-auth";
import cloudinary from "../../../../config/cloudinary";

// POST /api/book
export const POST = async (request: any) => {
  try {
    await connectDB();
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

    const newBook = new Book(bookData);
    await newBook.save();

    return new Response("Book Created", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};