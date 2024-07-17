import React from "react";
import Image from "next/image";
import { getBookById } from "@/app/_services/getBookById";
import { IoMdDoneAll } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { GiBookCover } from "react-icons/gi";
import "./viewbook.scss";
import {
  getRandomEdition,
  getRandomGenre,
  getRandomNumber,
} from "@/app/_utils/utils";

const ViewBook = async ({ params }: any) => {
  const book = await getBookById(params.id);

  const pages = getRandomNumber(300, 500);
  const edition = getRandomEdition();
  const genre = getRandomGenre();

  return (
    <>
      {book && (
        <div className="book-container">
          <div>
            <Image
              src={book.image}
              alt={`${book.title} ${book.author}`}
              width={200}
              height={260}
            />
          </div>
          <div className="book_container__book_detail">
            <span>
              <strong>Title:</strong> {book.title}
            </span>
            <span>
              <strong>Author:</strong> {book.author}
            </span>
            <span>
              <strong>Genre:</strong> {genre}
            </span>
            <span>
              <strong>Pages:</strong>
              <GiBookCover color="#a9a9a9"/> {pages}
            </span>
            <span>
              <strong>Edition:</strong> {edition}
            </span>
            <span>
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
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBook;
