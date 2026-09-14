import { Header } from "@/components/Header";
import { Rail } from "@/components/Rail";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <Rail />
      <main id="conteudo">
        <Hero />
        <Work />
        <Marquee />
        <About />
        <Background />
        <Contact />
      </main>
    </>
  );
}
