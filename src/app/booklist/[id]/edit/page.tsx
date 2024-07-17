import { getBookById } from "@/app/_services/getBookById";
import React, { FC } from "react";
import "./editBook.scss";
import { updateBook } from "@/app/_services/updateBook";
import SubmitFormButton from "@/app/_components/SubmitFormButton";

interface EditBookProps {
  params: {
    id: string;
  };
}

const EditBook: FC<EditBookProps> = async ({ params }) => {
  const { id } = params;
  const book = await getBookById(id);
  const { title, author, read } = book || {};

  return (
    <>
      {book && (
        <form action={updateBook} className="create-form">
          <input type="hidden" value={id} name="id" />
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={title}
            className="create-form__input"
          />
          <label>Author</label>
          <input
            type="text"
            name="author"
            required
            defaultValue={author}
            className="create-form__input"
          />
          <label>Image</label>
          <input type="file" name="image" className="create-form__input" />

          <div className="create-form__radio-container">
            <input
              type="radio"
              name="read"
              id="read_radio"
              value="read"
              defaultChecked={read}
            />
            <label htmlFor="read_radio">Read</label>
          </div>
          <div className="create-form__radio-container">
            <input
              type="radio"
              name="read"
              id="read_radio"
              value="unread"
              defaultChecked={!read}
            />
            <label htmlFor="read_radio">Not Read</label>
          </div>
          <SubmitFormButton label="Update Book" />
        </form>
      )}
    </>
  );
};

export default EditBook;
