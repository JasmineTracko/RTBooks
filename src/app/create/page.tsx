"use client";
import React from "react";
import { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isRead, setIsRead] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    if (image) {
      formData.append("image", image);
    }
    formData.append("read", isRead)

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        console.log("boook created");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>Insert a value (CREATE) in MONGO DB with Mongoose</div>
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
          name="fav_language"
          value="read"
          onClick={() => setIsRead("read")}
        />
        <label>Read</label>
        <input
          type="radio"
          name="fav_language"
          value="unread"
          onClick={() => setIsRead("unread")}
        />
        <label>Not Read</label>
        <div>
          <button type="submit">Add Book</button>
        </div>
      </form>
    </>
  );
};

export default Create;
