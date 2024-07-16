import Image from "next/image";
import React from "react";
import { getBooks } from "../_services/getBooks";
import RedirectButton from "../_components/RedirectButton";
import { IoMdDoneAll } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import "./booklist.scss";
import DeleteBook from "../_components/DeleteBook";

const BookList = async () => {
  const books = await getBooks();

  return (
    <div className="booklist_container">
      {books &&
        books.length > 0 &&
        books.map((book: Book) => (
          <div key={book._id} className="booklist_container__book">
            <div className="book_image_wrap">
              <Image
                src={book.image}
                alt={`${book.title} ${book.author}`}
                width={90}
                height={120}
              />
              <div className="book_details">
                <span>{book.author}</span>
                <span>{book.title}</span>
                <span>
                  <span className="book_status">
                    {book.read ? (
                      <>
                        <IoMdDoneAll color="green" />
                        Read
                      </>
                    ) : (
                      <>
                        <VscError color="red" />
                        Unread
                      </>
                    )}
                  </span>
                </span>
              </div>
            </div>
            <div className="book_details">
              <DeleteBook bookId={book._id.toString()} />
              <RedirectButton
                redirectUri={`/booklist/${book._id}/edit`}
                text="Edit Book"
              />
              <RedirectButton
                redirectUri={`/booklist/${book._id}`}
                text="View Book"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookList;
