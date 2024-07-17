"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import "./SubmitFormButton.scss";
import MiniLoader from "./MiniLoader";

const SubmitFormButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <button className="submit_form__button" type="submit" disabled={pending}>
        {pending ? <MiniLoader /> : label}
      </button>
    </>
  );
};

export default SubmitFormButton;
