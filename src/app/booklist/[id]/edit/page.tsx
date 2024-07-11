"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isRead, setIsRead] = useState("");

  const { id } = useParams();

  const getBookById = async (id: string) => {
    try {
      const res = await fetch(`/api/book/${id}`);
      if (res.status === 200) {
        const data = await res.json();
        setTitle(data.title);
        setAuthor(data.author);
        setIsRead(data.read ? "read" : "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookById(id as string);
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    if (image) {
      formData.append("image", image);
    }
    formData.append("read", isRead);

    try {
      const res = await fetch(`/api/book/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.status === 200) {
        console.log("book edit");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>Edit a value (PUT) in MONGO DB with Mongoose</div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author</label>
        <input
          type="text"
          id="author"
          name="author"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <input
          type="radio"
          name="isRead"
          value="read"
          onClick={() => setIsRead("read")}
          checked={isRead === "read"}
        />
        <label>Read</label>
        <input
          type="radio"
          name="isRead"
          value="unread"
          onClick={() => setIsRead("")}
          checked={isRead === ""}
        />
        <label>Not Read</label>

        <div>
          <button type="submit">Edit Book</button>
        </div>
      </form>
    </>
  );
};

export default EditBook;
