import Image from "next/image";
import cover from "../../public/cover.jpg";
import "./home.scss";
import RedirectButton from "./_components/RedirectButton";

export default function Home() {
  return (
    <main>
      <Image src={cover} alt="book" placeholder="blur" quality={70} fill />
      <div className="home-container">
        <h1 className="home-container__slogan">Choose your Next Book.</h1>
        <RedirectButton text="Explore our Books" redirectUri="/rtbooks" />
      </div>
    </main>
  );
}
