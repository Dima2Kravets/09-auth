import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Note Hub",
  description: "Simple app to create and manage your notes",
  openGraph: {
    type: "website",
    title: "Note Hub – Create and Manage Your Notes Easily",
    description: "Note Hub is a simple and intuitive app that helps you create, organize, and manage your notes efficiently.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Screenshot of Note Hub app interface"
      }
    ],
    url: `https://notehub.com`,
   }
};

export default function RootLayout({
  children, modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer/>
        </TanStackProvider>
      </body>
    </html>
  );
}