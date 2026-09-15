import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/lang";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
});

/** Aplica o tema antes da primeira pintura, para não piscar. */
const themeInit = `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export const metadata: Metadata = {
  title: "José - Full Stack Developer",
  description:
    "Full stack developer. Criei o Nutrin, software de nutrição usado por profissionais no Brasil, e publiquei o app dos pacientes na App Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={archivo.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
