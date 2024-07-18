"use client";
import React, { useEffect, useState } from "react";
import "./ritual.scss";
import { getBooks } from "../_services/getBooks";
import Image from "next/image";
import { toggleReadStatus } from "../_services/toggleReadStatus";
import Loader from "../_components/Loader";
import { MdOutlineErrorOutline } from "react-icons/md";
import RedirectButton from "../_components/RedirectButton";

const Ritual = () => {
  const defaultErrorMessage = "You are not authorized to perform this action";
  const [books, setBooks] = useState<Book[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getBooks();
        setBooks(response);
      } catch (error: any) {
        setIsError(defaultErrorMessage);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleReadStatus = async (bookId: string) => {
    setIsLoading(true);
    try {
      await toggleReadStatus(bookId);
      setBooks(
        (prevBooks) =>
          prevBooks?.map((book) =>
            book._id === bookId ? { ...book, read: !book.read } : book
          ) || null
      );
    } catch (error: any) {
      setIsError(defaultErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="error-container">
        <MdOutlineErrorOutline />
        <h1>{isError}</h1>
        <RedirectButton text="Back to Home Page" redirectUri="/" />
      </div>
    );

  return (
    <div className="ritual-container">
      {books &&
        books.map((book) => (
          <div
            key={book._id}
            className="book-item"
            onClick={() => handleReadStatus(book._id)}
          >
            {book.read && (
              <>
                <div className="line-1"></div>
                <div className="line-2"></div>
              </>
            )}
            <Image
              src={book.image}
              alt={`${book.title} ${book.author}`}
              width={120}
              height={160}
              className={book.read ? "book-opacity" : ""}
            />
          </div>
        ))}
    </div>
  );
};

export default Ritual;
