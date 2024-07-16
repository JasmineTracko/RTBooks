"use client";
import React, { FormEvent } from "react";
import { useState } from "react";
import "./FormCreate.scss";
import { Slide, toast } from "react-toastify";
import Loader from "./Loader";

const FormCreate = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isRead, setIsRead] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setImage(null);
    setIsRead("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    image && formData.append("image", image);
    formData.append("read", isRead);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        toast.success("Book created successfully!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        resetForm();
      }
    } catch (error) {
      toast.error(`Something went wrong: ${error}`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <label>Title</label>
      <input
        type="text"
        name="title"
        className="create-form__input"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Author</label>
      <input
        type="text"
        name="author"
        className="create-form__input"
        required
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label>Image</label>
      <input
        type="file"
        name="image"
        required
        className="create-form__input"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <div className="create-form__radio-container">
        <input
          type="radio"
          id="read_radio"
          checked={isRead === "read"}
          onChange={() => setIsRead("read")}
        />
        <label htmlFor="read_radio">Read</label>
      </div>
      <div className="create-form__radio-container">
        <input
          type="radio"
          id="unread_radio"
          checked={isRead === "unread"}
          onChange={() => setIsRead("unread")}
        />
        <label htmlFor="unread">Not Read</label>
      </div>
      <button className="create-form__button" type="submit">
        Insert Book
      </button>
    </form>
  );
};

export default FormCreate;
