import React from "react";
import { createBook } from "../_services/createBook";
import SubmitFormButton from "../_components/SubmitFormButton";
import "./createForm.scss";

const Create = () => {
  return (
    <form action={createBook} className="create-form">
      <label>Title</label>
      <input type="text" name="title" className="create-form__input" required />
      <label>Author</label>
      <input
        type="text"
        name="author"
        className="create-form__input"
        required
      />
      <label>Image</label>
      <input type="file" name="image" required className="create-form__input" />
      <div className="create-form__radio-container">
        <input type="radio" id="read_radio" name="read" value="read" />
        <label htmlFor="read_radio">Read</label>
      </div>
      <div className="create-form__radio-container">
        <input type="radio" id="unread_radio" name="read" value="unread" />
        <label htmlFor="unread">Not Read</label>
      </div>
      <SubmitFormButton label="Insert Book" />
    </form>
  );
};

export default Create;
