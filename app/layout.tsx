import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/lang";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "José — Full Stack Developer",
  description:
    "Full stack developer. Criei o Nutrin, software de nutrição usado por profissionais no Brasil, e publiquei o app dos pacientes na App Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
