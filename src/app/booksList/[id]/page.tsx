"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Book {
  author: string;
  title: string;
  image: string;
  read: string;
}

const ViewBook = () => {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams();

  const getBookById = async (id: string) => {
    try {
      const res = await fetch(`/api/book/${id}`);
      if (res.status === 200) {
        const data = await res.json();
        setBook(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getBookById(id as string);
    }
  }, [id]);

  return (
    <div>
      {book && (
        <>
          <Image
            src={book.image}
            alt={`book.title + book.author`}
            width={200}
            height={200}
          />
          {book.title} - {book.author} - Lho letto ? {book.read ? "si" : "no"}
        </>
      )}
    </div>
  );
};

export default ViewBook;
