import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./_components/SessionWrapper";
import Navigation from "./_components/Navigation";
import { Josefin_Sans } from "next/font/google";

const inter = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RTBooks",
  description: "Choose your next book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={inter.className}
          style={{ margin: "0", backgroundColor: "black", color: "white" }}
        >
          <Navigation />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
