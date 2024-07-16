"use client";
import { FC } from "react";
import RedirectButton from "./_components/RedirectButton";
import "./errorPage.scss";

interface ErrorProps {
  error: {
    message: string;
  };
}

const Error: FC<ErrorProps> = ({ error }) => {
  return (
    <main className="error-page">
      <h1 className="error-page_wrong">Something went wrong!</h1>
      <p>{error.message}</p>

      <RedirectButton text="Try Again" redirectUri="/" />
    </main>
  );
};

export default Error;
