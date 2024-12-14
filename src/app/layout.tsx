import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProgressBarProvider from "./components/ProgressBar";
import { GoogleTagManager } from "@next/third-parties/google";

import { Suspense } from "react";
import { classNames } from "./constant/common";
import styles from "./page.module.css";

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

      <body className={classNames(styles.main, inter.className)}>
        <GoogleTagManager gtmId="GTM-KLXH5B7D" />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KLXH5B7D"
            height="0"
            width="0"
            className={"display:none;visibility:hidden"}></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <Navbar />
        <Suspense>
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
