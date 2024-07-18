"use client";
import { FC } from "react";
import RedirectButton from "./_components/RedirectButton";
import "./errorPage.scss";

/* interface ErrorProps {
  error: {
    message: string;
  };
} */

const Error: FC/* <ErrorProps> */ = (/* { error } */) => {
  return (
    <main className="error-page">
      <h1 className="error-page_wrong">Something went wrong!</h1>
      <p>{/* {error.message} */}You are not authorized to perform this action</p>

      <RedirectButton text="Back to Home Page" redirectUri="/" />
    </main>
  );
};

export default Error;
