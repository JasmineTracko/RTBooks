"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import "./UpdateBook.scss";
import MiniLoader from "./MiniLoader";

const UpdateBookButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <button className="update-form__button" type="submit" disabled={pending}>
        {pending ? <MiniLoader /> : "Update Book"}
      </button>
    </>
  );
};

export default UpdateBookButton;
