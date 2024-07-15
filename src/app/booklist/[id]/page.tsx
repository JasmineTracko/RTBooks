import React from "react";
import Image from "next/image";
import { getBookById } from "@/app/_services/getBookById";

const ViewBook = async ({ params }: any) => {
  const book = await getBookById(params.id);

  return (
    <div>
      {book && (
        <>
          <Image
            src={book.image}
            alt={`book.title + book.author`}
            width={50}
            height={70}
          />
          {book.title} - {book.author} -{book.read ? "si" : "no"}
        </>
      )}
    </div>
  );
};

export default ViewBook;
