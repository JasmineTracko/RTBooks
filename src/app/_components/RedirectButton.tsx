import Link from "next/link";
import React, { FC } from "react";
import "./RedirectButton.scss";

interface RedirectButtonProps {
  redirectUri: string;
  text: string;
}

const RedirectButton: FC<RedirectButtonProps> = ({ redirectUri, text }) => {
  return (
    <Link href={redirectUri} className="redirect__button">
      {text}
    </Link>
  );
};

export default RedirectButton;
