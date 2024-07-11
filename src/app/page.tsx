import Image from "next/image";
import cover from "../../public/cover.jpg";
import Link from "next/link";
import "./home.scss";

export default function Home() {
  return (
    <main>
      <Image src={cover} alt="book" placeholder="blur" quality={70} fill />
      <div className="home-container">
        <h1 className="home-container__slogan">Choose your Next Book.</h1>
        <Link href="/rtbook" className="home-container__button">
          Explore our books
        </Link>
      </div>
    </main>
  );
}
