"use client";
import React, { FC, useTransition } from "react";
import "./DeleteBook.scss";
import { deleteBook } from "../_services/deleteBook";
import MiniLoader from "./MiniLoader";

interface DeleteBookProps {
  bookId: string;
}

const DeleteBook: FC<DeleteBookProps> = ({ bookId }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book?"))
      startTransition(() => deleteBook(bookId));
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="delete_book_submit"
        type="submit"
        disabled={isPending}
      >
        {isPending ? <MiniLoader /> : "Delete Book"}
      </button>
    </>
  );
};

export default DeleteBook;
