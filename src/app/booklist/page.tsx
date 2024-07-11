import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getBooks } from "../_services/getBooks";

const BookList = async () => {
  const books = await getBooks();
  console.log(books);
  console.log("render");

  /*   const deleteBook = async (id: string) => {
    try {
      const res = await fetch(`/api/book/${id}`, { method: "DELETE" });
      if (res.status === 200) {
        console.log("Book Deleted");
        getBooks();
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <>
      <div>Read data from MongoDB with Mongoose</div>
      {books &&
        books.length > 0 &&
        books.map((book: Book) => (
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
            {/* <button onClick={() => deleteBook(book._id)}>Delete Book</button> */}
            <Link href={`/booklist/${book._id}/edit`}>Edit Book</Link>
            <Link href={`/booklist/${book._id}`}>View Book</Link>
          </div>
        ))}
    </>
  );
};

export default BookList;
