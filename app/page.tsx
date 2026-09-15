import { Header } from "@/components/Header";
import { Row } from "@/components/Row";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Marquee } from "@/components/Marquee";
import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="shell">
        <Row>
          <Hero />
        </Row>
        <Row>
          <Work />
        </Row>
        <Row>
          <Marquee />
        </Row>
        <Row>
          <Background />
        </Row>
        <Row hatch>
          <Contact />
        </Row>
      </main>
    </>
  );
}
