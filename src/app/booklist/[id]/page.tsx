import React from "react";
import Image from "next/image";
import { getBookById } from "@/app/_services/getBookById";
import { IoMdDoneAll } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { GiBookCover } from "react-icons/gi";
import "./viewbook.scss";

const ViewBook = async ({ params }: any) => {
  const book = await getBookById(params.id);

  return (
    <>
      {book && (
        <div className="book-container">
          <div style={{ display: "flex", gap: "1rem" }}>
            <Image
              src={book.image}
              alt={`book.title + book.author`}
              width={200}
              height={260}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <span>Title: {book.title}</span>
              <span>Author: {book.author}</span>
              
              <span style={{ display: "flex", gap: "0.5rem" }}>
                Genre: Adventure
              </span>
              <span style={{ display: "flex", gap: "0.5rem" }}>
              <GiBookCover /> 375 Pages
              </span>
              <span style={{ display: "flex", gap: "0.5rem" }}>
                Edition: Mondadori
              </span>
              <span style={{ display: "flex", gap: "0.5rem" }}>
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
        </div>
      )}
    </>
  );
};

export default ViewBook;
