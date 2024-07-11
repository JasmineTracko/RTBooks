"use client";
import React from "react";
import Link from "next/link";
import "./Navigation.scss";
import { usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn, signOut } from "next-auth/react";

const Navigation = () => {
  const { data: session } = useSession();
  const path = usePathname();

  return (
    <nav className="nav-container">
      <div className={`nav-container__link ${path === "/" ? "active" : ""}`}>
        <Link href="/">Home</Link>
      </div>
      <div
        className={`nav-container__link ${
          path === "/booklist" ? "active" : ""
        }`}
      >
        <Link href="/booklist">Book List</Link>
      </div>
      <div
        className={`nav-container__link ${path === "/create" ? "active" : ""}`}
      >
        <Link href="/create">New Book</Link>
      </div>
      <div
        className={`nav-container__link ${path === "/rtbook" ? "active" : ""}`}
      >
        <Link href="/rtbook">Ritual Book</Link>
      </div>
      {session ? (
        <div className="nav-container__button" onClick={() => signOut()}>
          <FcGoogle /> Logout
        </div>
      ) : (
        <div className="nav-container__button" onClick={() => signIn("google")}>
          <FcGoogle /> Login
        </div>
      )}
    </nav>
  );
};

export default Navigation;
