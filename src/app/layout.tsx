import type { Metadata } from "next";
import { Geist, Geist_Mono, Rosarivo } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rosarivo = Rosarivo({
  variable: "--font-rosarivo",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "OneStop",
  description: "Your one stop for all your coding needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet"/>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Outfit:wght@100..900&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${rosarivo.variable} container mx-auto xl:max-w-[74vw]`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
