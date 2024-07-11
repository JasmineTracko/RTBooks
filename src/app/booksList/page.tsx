"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  read: string;
}

const BooksList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBooks = async () => {
    try {
      const res = await fetch(`/api/book`, { cache: "no-store" });

      if (res.status === 200) {
        const data = await res.json();
        setBooks(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = async (id: string) => {
    try {
      const res = await fetch(`/api/book/${id}`, { method: "DELETE" });
      if (res.status === 200) {
        console.log("Book Deleted");
        getBooks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Read data from MongoDB with Mongoose</div>
      {isLoading && <div>Sto caricando...</div>}
      {books.map((book) => (
        <div key={book._id}>
          <Image
            src={book.image}
            alt={`${book.title} ${book.author}`}
            width={200}
            height={200}
          />
          <span>
            Authore: {book.author} Titolo: {book.title}
          </span>
          <span>L ho letto? {book.read ? "si" : "no"} </span>
          <button onClick={() => deleteBook(book._id)}>Delete Book</button>
          <Link href={`/booksList/${book._id}/edit`}>Edit Book</Link>
          <Link href={`/booksList/${book._id}`}>View Book</Link>
        </div>
      ))}
    </>
  );
};

export default BooksList;
