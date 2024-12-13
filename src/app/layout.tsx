import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProgressBarProvider from "./components/ProgressBar";
import { Suspense } from "react";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Labuca - Shop giày thời trang chính hãng",
  description: "Labuca - Shop giày thời trang chính hãng",
  keywords:
    "labuca, labuca.vn, labu, giày thời trang, giày cao gót, giày thể thao, giày sneaker, giày công sở, giày đẹp, giày giá rẻ, giày chính hãng, shop giày, mua giày online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header />
      <body className={inter.className}>
        <Navbar />
        <Suspense>
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
